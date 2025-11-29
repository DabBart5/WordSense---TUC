import { GET_GAME_BY_ID } from '$lib/server/dictionaryAPI.js';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
    const gameId = url.searchParams.get("gameId");
    if (!gameId) throw redirect(303, "/");

    try {
        const result = await GET_GAME_BY_ID(gameId);

        console.log("Wordset =", result.nextwords[0].exsentence[0])

        return {
            wordSet: result.nextwords,
            lives: result.lives,
            showExSentence: result.showexsentence,
            maxRounds: result.maxrounds,
            mode: result.mode,
            timer: result.timer
        };
    }
    catch {
        throw redirect(303, "/");
    }

}
