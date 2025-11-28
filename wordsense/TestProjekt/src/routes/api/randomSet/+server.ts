import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function GETRANDOM(language: string, difficulty: string) {
    const result = await db.query(`
        SELECT * FROM dictionary WHERE language = $1 AND difficulty = $2 ORDER BY RANDOM() LIMIT 4`, [language, difficulty]);
    return json(result.rows);
}
