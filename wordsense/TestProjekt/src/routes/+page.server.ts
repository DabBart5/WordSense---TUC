import type { Actions } from './$types';
import { availableLanguages } from "$lib/localisation/languages"
import { availableDifficulties, availableModes, maxTimer, minTimer } from '$lib/constData.js';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { GETRANDOM } from '$lib/server/dictionaryAPI.js';

export const actions = {
    startGame: async ({ request }) => {
        const form = await request.formData();

        //clean up whenever a new game is started
        db.query(`
            DELETE FROM games WHERE created_at < NOW() - INTERVAL '1 minuteq';`
        );

        // validate form
        if (checkData(form) !== 0) {
            return fail(400, {
                error: 'invalidInput',
                message: 'invalid input'
            });
        }
        // extract form values
        const language = getString(form, 'language');
        const difficulty = getString(form, 'difficulty');

        if (!language || !difficulty) {
            return fail(400, {
                error: 'invalidInput',
                message: 'invalid input'
            });
        }

        // fetch 4 words
        const words = await GETRANDOM(language, difficulty);
        if (!words) {
            return fail(500, {
                error: 'noWordsFound',
                message: 'Could not generate words for this game.'
            });
        }

        const data = await words.json();
        // console.log(data)

        // create game id
        const result = await db.query(
            `INSERT INTO games (data)
             VALUES ($1)
             RETURNING id`,
            [JSON.stringify(data)]
        );

        // get generated id
        const gameId = result.rows[0].id;

        // redirect user to game page
        throw redirect(303, `/game?gameId=${gameId}`);
    }
};

function getString(form: FormData, name: string) {
    const value = form.get(name);
    if (typeof value !== "string") return null;
    return value;
}

function checkData(data: FormData) {
    const language = getString(data, 'language');
    if (language === null) return -1;
    if (!availableLanguages.includes(language)) return -1;

    const difficulty = getString(data, 'difficulty');
    if (difficulty === null) return -1;
    if (!availableDifficulties.includes(difficulty)) return -1;// difficulty is part of accepted difficulties

    const mode = getString(data, 'mode');
    if (mode === null) return -1;
    if (!availableModes.includes(mode)) return -1;//mode is part of possible modes

    const timer = getString(data, 'timerval');
    if (timer === null) return -1;

    if ((Number(timer) < minTimer || Number(timer) > maxTimer)) return -1; //timervalue lies between max and min

    return 0;
}


// let language = $state("English");
// let mode = $state("word");
// let isTimer = $state(false);
// let modeIsFree = $state(false);
// let showExSentence = $state(false);
// let timer = $state(10);
// let selectedLanguage = $state('English');

// let difficulty = $state("A1");
