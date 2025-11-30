import { redirect } from '@sveltejs/kit';
import { GET_GAME_BY_ID } from '$lib/server/dictionaryAPI';

export async function load({ url }) {

    const gameId = url.searchParams.get("gameId");
    const currentRound = Number(url.searchParams.get("r"));
    if (!gameId) throw redirect(303, "/");

    try {
        const result = await GET_GAME_BY_ID(gameId);

        return {
            wordHistory: result.priorwords,
            lives: result.lives,
            maxRounds: result.maxrounds,
            mode: result.mode
        };
    }
    catch {
        throw redirect(303, "/error");
    }

}