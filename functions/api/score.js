const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store'
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function toFloorNumber(value) {
    const floor = Math.floor(Number(value));
    return Number.isFinite(floor) && floor > 0 ? floor : 0;
}

function normalizeMode(value) {
    return value === 'easy' ? 'easy' : 'hard';
}

export async function onRequestPost({ request, env }) {
    if (!env.DB) return json({ error: 'Cloudflare D1 绑定 DB 尚未配置。' }, 500);

    const body = await request.json().catch(() => null);
    const userId = String(body && body.userId || '').trim();
    const floor = toFloorNumber(body && body.floor);
    const mode = normalizeMode(body && body.mode);
    if (!userId || floor < 1) return json({ error: '缺少玩家或关卡数。' }, 400);

    const now = new Date().toISOString();
    const column = mode === 'easy' ? 'best_floor_easy' : 'best_floor_hard';
    const legacyBestFloor = mode === 'hard'
        ? ', best_floor = CASE WHEN best_floor < ? THEN ? ELSE best_floor END'
        : '';
    const params = mode === 'hard'
        ? [floor, floor, floor, floor, now, userId]
        : [floor, floor, now, userId];

    await env.DB.prepare(
        `UPDATE users
         SET ${column} = CASE WHEN ${column} < ? THEN ? ELSE ${column} END${legacyBestFloor},
             updated_at = ?
         WHERE id = ?`
    ).bind(...params).run();

    const user = await env.DB.prepare(
        `SELECT id, username,
                best_floor AS bestFloor,
                best_floor_easy AS bestFloorEasy,
                best_floor_hard AS bestFloorHard,
                updated_at AS updatedAt
         FROM users
         WHERE id = ?`
    ).bind(userId).first();

    if (!user) return json({ error: '玩家不存在。' }, 404);
    return json({ mode, user });
}

export function onRequestGet() {
    return json({ error: 'Method Not Allowed' }, 405);
}
