import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function GET_RANDOM(language: string, difficulty: string) {
    const result = await db.query(`
        SELECT * FROM dictionary WHERE language = $1 AND difficulty = $2 ORDER BY RANDOM() LIMIT 4`, [language, difficulty]);
    return json(result.rows);
}

export async function NEW_GAME(nextWordSet: any, timerVal: Number, mode: string, showExSentence: boolean, maxRounds: number, lives: number) {
    const result = await db.query(
        `INSERT INTO games (nextWords, timer, mode, showExSentence, maxRounds, lives) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [JSON.stringify(nextWordSet), timerVal, mode, showExSentence, maxRounds, lives]
    );
    return result.rows[0].id;
}

export async function CLEAN_GAMES() {
    db.query(`
            DELETE FROM games WHERE created_at < NOW() - INTERVAL '1 hour';`
    );
}

export async function GET_GAME_BY_ID(uuid: string) {
    const result = await db.query("SELECT * FROM games WHERE id = $1", [uuid]);
    return result.rows[0];
}