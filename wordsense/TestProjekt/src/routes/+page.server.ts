import type { Actions } from './$types';
import { availableLanguages } from "$lib/localisation/languages"
import { availableDifficulties, availableModes, maxTimer, minTimer } from '$lib/constData.js';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { CLEAN_GAMES, GET_RANDOM, NEW_GAME } from '$lib/server/dictionaryAPI.js';

export const actions = {
    startGame: async ({ request }) => {
        const form = await request.formData();

        //clean up whenever a new game is started
        CLEAN_GAMES();

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
        const isTimer = getString(form, "isTimer") === 'isTimer';
        const maxRounds = getString(form, "isFree") === 'isFree' ? -1 : 10;
        const showExSentence = getString(form, "showExSentence") === 'showExSentence';
        const timerVal = isTimer ? Number(getString(form, 'timerval')): -1;
        const mode = getString(form, 'mode');


        console.log("mode = ", mode);
        
        console.log("timerVal = ", timerVal);
        console.log("maxRounds = ", maxRounds);
        
        console.log("showExSentence = ", showExSentence);
        
        console.log("difficulty = ", difficulty);
        console.log("language = ", language);

        if (!language || !difficulty || !mode) {
            return fail(400, {
                error: 'invalidInput',
                message: 'invalid input'
            });
        }

        // fetch 4 words
        const words = await GET_RANDOM(language, difficulty);
        if (!words) {
            return fail(500, {
                error: 'noWordsFound',
                message: 'Could not generate words for this game.'
            });
        }

        const wordSet = await words.json();
        // console.log(data)

        // create Game, get id
        const gameId = await NEW_GAME(wordSet, timerVal, mode, showExSentence, maxRounds, 5);

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
