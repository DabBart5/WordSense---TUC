import { fail, redirect } from '@sveltejs/kit';
import { startNewGame } from '$lib/server/startNewGame.js';

export const actions = {
    startGame: async ({ request }) => {
        const form = await request.formData();

        const gameId = await startNewGame(form);
        // redirect user to game page

        if (typeof gameId === "number" && gameId < 0 ){
            return fail(500, "internal server error")
        }
        throw redirect(303, `/game?gameId=${gameId}`);
    }
};

