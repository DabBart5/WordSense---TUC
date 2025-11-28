import type { Actions } from './$types';
import { availableLanguages } from "$lib/localisation/languages"
import { availableDifficulties, availableModes, maxTimer, minTimer } from '$lib/constData.js';
import { fail } from '@sveltejs/kit';
import { get20WordsByWordtype, getAll, getGameSetStandard, getWordById, getXRandomWords } from '$lib/server/dictionaryAPI';
import { redirect } from '@sveltejs/kit';


export const actions = {
    startGame: async ({ request, cookies }) => {
        const form = await request.formData();

        // your logic here

        if (checkData(form) != 0) {
            return fail(400, { error: 'invalidInput', message: "invalid Input" });
        };

        // // const isTimer = form.get('isTimer') === 'on';
        // // const isFree = form.get('isFree') === 'on';
        // // const showExSentence = form.get('showExSentence') === 'on';

        const language = getString(form, 'language');
        if (language === null) return fail(400, { error: 'invalidInput', message: "invalid Input" });

        const difficulty = getString(form, 'difficulty');
        if (difficulty === null) return fail(400, { error: 'invalidInput', message: "invalid Input" });


        // console.log(form.get('isTimer'));
        // console.log(form.get('showExSentence'));
        // console.log(form.get('modeIsFree'));


        const words = getXRandomWords(8, language, difficulty);

        // console.log(words)

        // console.log("langaugae = " + language);
        // console.log("difficulty = " +difficulty);

        cookies.set("mydata", JSON.stringify(words), {
            path: '/',
            httpOnly: false,      // allow reading from client
            maxAge: 60 * 20       // 20 minutes
        });

        throw redirect(303, '/game');
    }

    //     return { success: true, words};
    // }
}

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

    if ((Number(data.get("timer")) < minTimer || Number(data.get("timer")) > maxTimer)) return -1; //timervalue lies between max and min

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
