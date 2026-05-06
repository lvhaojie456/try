const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store'
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function cleanUsername(value) {
    return (value || '').trim().replace(/\s+/g, ' ');
}

function validateUsername(username) {
    const len = Array.from(username).length;
    if (len < 2 || len > 16) return '账号需要 2-16 个字符。';
    if (!/^[\p{L}\p{N}_ -]+$/u.test(username)) return '账号只能包含文字、数字、空格、下划线或短横线。';
    return '';
}

function validatePassword(password) {
    if (!password || password.length < 6 || password.length > 32) return '密码需要 6-32 位。';
    return '';
}

function hex(bytes) {
    return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function randomSalt() {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return hex(bytes);
}

async function hashPassword(password, salt) {
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
    );
    const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' },
        key,
        256
    );
    return hex(bits);
}

export async function onRequestPost({ request, env }) {
    if (!env.DB) return json({ error: 'Cloudflare D1 绑定 DB 尚未配置。' }, 500);

    const body = await request.json().catch(() => null);
    const username = cleanUsername(body && body.username);
    const password = String(body && body.password || '');
    const validationError = validateUsername(username);
    if (validationError) return json({ error: validationError }, 400);
    const passwordError = validatePassword(password);
    if (passwordError) return json({ error: passwordError }, 400);

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const passwordSalt = randomSalt();
    const passwordHash = await hashPassword(password, passwordSalt);

    try {
        await env.DB.prepare(
            `INSERT INTO users (id, username, best_floor, best_floor_easy, best_floor_hard, password_salt, password_hash, created_at, updated_at)
             VALUES (?, ?, 1, 1, 1, ?, ?, ?, ?)`
        ).bind(id, username, passwordSalt, passwordHash, now, now).run();

        return json({
            user: {
                id,
                username,
                bestFloor: 1,
                bestFloorEasy: 1,
                bestFloorHard: 1
            }
        }, 201);
    } catch(e) {
        const message = String(e && e.message || '');
        if (message.includes('UNIQUE')) return json({ error: '这个玩家名已被占用。' }, 409);
        return json({ error: '注册失败，请稍后再试。' }, 500);
    }
}

export function onRequestGet() {
    return json({ error: 'Method Not Allowed' }, 405);
}
