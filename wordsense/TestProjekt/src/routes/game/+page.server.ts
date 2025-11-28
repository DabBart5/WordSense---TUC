import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
    const gameId = url.searchParams.get("gameId");
    if (!gameId) throw redirect(303, "/");

    const result = await db.query(
        "SELECT data FROM games WHERE id = $1",
        [gameId]
    );

    if (result.rowCount === 0) throw redirect(303, "/");

    return {
        words: result.rows[0].data,
        gameId
    };
}