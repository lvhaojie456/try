const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store'
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function normalizeMode(value) {
    return value === 'easy' ? 'easy' : 'hard';
}

export async function onRequestGet({ request, env }) {
    if (!env.DB) return json({ error: 'Cloudflare D1 绑定 DB 尚未配置。' }, 500);

    const url = new URL(request.url);
    const mode = normalizeMode(url.searchParams.get('mode'));
    const column = mode === 'easy' ? 'best_floor_easy' : 'best_floor_hard';

    const { results } = await env.DB.prepare(
        `SELECT id, username, ${column} AS bestFloor, updated_at AS updatedAt
         FROM users
         ORDER BY ${column} DESC, updated_at ASC
         LIMIT 10`
    ).all();

    return json({ mode, entries: (results || []).map(entry => ({ ...entry, mode })) });
}

export function onRequestPost() {
    return json({ error: 'Method Not Allowed' }, 405);
}
