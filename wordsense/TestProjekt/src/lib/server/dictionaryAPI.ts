import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { wordTypes } from '$lib/constData';

export async function GET_RANDOM(language: string, difficulty: string) {

    const rand = Math.floor(Math.random() * 3);
    const randWortType = wordTypes[rand]; //
    const result = await db.query(`
        SELECT * FROM dictionary WHERE language = $1 AND difficulty = $2 AND wordtype = $3 ORDER BY RANDOM() LIMIT 4`, [language, difficulty, randWortType]);
    
    console.log("current wordtype = ",randWortType, "rand = ", rand)
    return json(result.rows);
}

//should integrate GET_RANDOM in NEW_GAME!!
export async function NEW_GAME(nextWordSet: any, timerVal: Number, mode: string, showExSentence: boolean, maxRounds: number, lives: number, language: string, difficulty: string) {
    const result = await db.query(
        `INSERT INTO games (nextWords, timer, mode, showExSentence, maxRounds, lives, language, difficulty, currentround) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1) RETURNING id`,
        [JSON.stringify(nextWordSet), timerVal, mode, showExSentence, maxRounds, lives, language, difficulty]
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

export async function GET_NEXT_GAME(correct: boolean, gameId: string) {
    //param: bool correct
    //does: append nextWords to priorWords, updates currentRound, lives, roundsWon
    //returns 

    // try {

        const settings = await GET_GAME_BY_ID(gameId);
        // console.log("settings = ",settings)
        const difficulty = settings.difficulty;
        const language = settings.language;

        console.log("correct = ", correct)
        // console.log("could fetch settings, difficulty = ", difficulty, ", language = ", language);

        // const newNextWords = await (await GET_RANDOM(language, difficulty)).json();

//         console.log("newNextWords =", newNextWords);
// console.log("Array.isArray:", Array.isArray(newNextWords));
// console.log("is null:", newNextWords === null);
// console.log("stringified:", JSON.stringify(newNextWords));


// get data 
const newNextWordsObj = await (await GET_RANDOM(language, difficulty)).json();

// make absolutely sure it's JSON-safe
const safeNextWords = JSON.parse(JSON.stringify(newNextWordsObj)); // strips non-serializable things

// stringify for pg
const nextWordsJson = JSON.stringify(safeNextWords);

// console.log("nextWordsJson type:", typeof nextWordsJson, "len:", nextWordsJson.length);


        if (correct) {
            const nextGame = await db.query(
                    `
                UPDATE games
                SET 
                priorwords = COALESCE(priorwords, '[]'::jsonb) || COALESCE(nextwords, '[]'::jsonb),
                nextwords = $1::jsonb,
                roundswon = COALESCE(roundswon, '{}'::int[]) || currentround,
                currentround = currentround + 1
                WHERE id = $2
                RETURNING *;
                `,
                [nextWordsJson, gameId]
            );
            return nextGame.rows[0];
            // console.log("correct was correct, result = ", nextGame.rows[0])
        }
        else {
            const nextGame = await db.query(
                    `
                UPDATE games
                SET 
                priorwords = COALESCE(priorwords, '[]'::jsonb) || COALESCE(nextwords, '[]'::jsonb),
                nextwords = $1::jsonb,
                roundswon = COALESCE(roundswon, '{}'::int[]) || currentround,
                lives = lives -1,
                currentround = currentround + 1
                WHERE id = $2
                RETURNING *;
                `,
                [nextWordsJson, gameId]
            );
            // console.log("correct was false, result = ", nextGame.rows[0])
            return nextGame.rows[0];
        }
    // }
    // catch {
    //     return -1;
    // }


}//change the return value