import type { Actions } from './$types';
import { availableLanguages } from "$lib/constData.js"
import { availableDifficulties, availableModes, maxTimer, minTimer } from '$lib/constData.js';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { CLEAN_GAMES, GET_RANDOM, NEW_GAME } from '$lib/server/dictionaryAPI.js';
import { startNewGame } from '$lib/server/startNewGame.js';

export const actions = {
    startGame: async ({ request }) => {
        const form = await request.formData();

        console.log("startGaaeeeme = ",form)
        const gameId = await startNewGame(form);
        // redirect user to game page

        if (typeof gameId === "number" && gameId < 0 ){
            throw redirect(500, `/error`)
        }
        throw redirect(303, `/game?gameId=${gameId}`);
    }
};

