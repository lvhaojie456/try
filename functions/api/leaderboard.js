const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store'
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

export async function onRequestGet({ env }) {
    if (!env.DB) return json({ error: 'Cloudflare D1 绑定 DB 尚未配置。' }, 500);

    const { results } = await env.DB.prepare(
        `SELECT id, username, best_floor AS bestFloor, updated_at AS updatedAt
         FROM users
         ORDER BY best_floor DESC, updated_at ASC
         LIMIT 10`
    ).all();

    return json({ entries: results || [] });
}

export function onRequestPost() {
    return json({ error: 'Method Not Allowed' }, 405);
}
