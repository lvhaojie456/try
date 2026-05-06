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

async function verifyPassword(user, password) {
    if (!user.password_hash || user.password_hash === 'legacy:123456') return password === '123456';
    if (!user.password_salt) return false;
    return await hashPassword(password, user.password_salt) === user.password_hash;
}

export async function onRequestPost({ request, env }) {
    if (!env.DB) return json({ error: 'Cloudflare D1 绑定 DB 尚未配置。' }, 500);

    const body = await request.json().catch(() => null);
    const username = cleanUsername(body && body.username);
    const password = String(body && body.password || '');
    if (!username || !password) return json({ error: '请输入账号和密码。' }, 400);

    const user = await env.DB.prepare(
        `SELECT id, username, best_floor, password_salt, password_hash, updated_at
         FROM users
         WHERE username = ?`
    ).bind(username).first();

    if (!user || !(await verifyPassword(user, password))) return json({ error: '账号或密码错误。' }, 401);

    if (!user.password_hash || user.password_hash === 'legacy:123456') {
        const salt = randomSalt();
        const hash = await hashPassword(password, salt);
        await env.DB.prepare(
            `UPDATE users SET password_salt = ?, password_hash = ?, updated_at = ? WHERE id = ?`
        ).bind(salt, hash, new Date().toISOString(), user.id).run();
    }

    return json({
        user: {
            id: user.id,
            username: user.username,
            bestFloor: user.best_floor
        }
    });
}

export function onRequestGet() {
    return json({ error: 'Method Not Allowed' }, 405);
}
