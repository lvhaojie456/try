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
    if (len < 2 || len > 16) return '玩家名需要 2-16 个字符。';
    if (!/^[\p{L}\p{N}_ -]+$/u.test(username)) return '玩家名只能包含文字、数字、空格、下划线或短横线。';
    return '';
}

export async function onRequestPost({ request, env }) {
    if (!env.DB) return json({ error: 'Cloudflare D1 绑定 DB 尚未配置。' }, 500);

    const body = await request.json().catch(() => null);
    const username = cleanUsername(body && body.username);
    const validationError = validateUsername(username);
    if (validationError) return json({ error: validationError }, 400);

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    try {
        await env.DB.prepare(
            `INSERT INTO users (id, username, best_floor, created_at, updated_at)
             VALUES (?, ?, 1, ?, ?)`
        ).bind(id, username, now, now).run();

        return json({
            user: {
                id,
                username,
                bestFloor: 1
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
