import { fail, redirect } from '@sveltejs/kit';
import { CLEAN_GAMES, GET_GAME_BY_ID, GET_RANDOM, NEW_GAME } from '$lib/server/dictionaryAPI';
import { availableDifficulties, availableLanguages, availableModes, maxTimer, minTimer } from '$lib/constData';
import { startNewGame } from '$lib/server/startNewGame.js';

export async function load({ url }) {

    const gameId = url.searchParams.get("gameId");

    if (!gameId) throw redirect(303, "/");

    try {
        const result = await GET_GAME_BY_ID(gameId);

        const won = result.lives != 0;

        return {
            language: result.language,
            timer: result.timer,
            showExSentence: result.showexsentence,
            wordHistory: result.priorwords,
            lives: result.lives,
            maxRounds: result.maxrounds,
            mode: result.mode,
            difficulty: result.difficulty,
            roundsWon: result.roundswon,
            won: won
        };
    }
    catch {
        throw redirect(303, "/error");
    }

}

export const actions = {
    startGame: async ({ request }) => {
        const form = await request.formData();

        const gameId = await startNewGame(form);
        // redirect user to game page

        // if (!response.ok) {
        //     return fail(500, "could not create new game")
        // }

        if (typeof gameId === "number" && gameId < 0 ){
            throw redirect(500, `/error`)
        }

        throw redirect(303, `/game?gameId=${gameId}`);
    }
};
