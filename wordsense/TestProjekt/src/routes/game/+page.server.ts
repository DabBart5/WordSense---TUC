import { availableDifficulties } from '$lib/constData.js';
import { GET_GAME_BY_ID, GET_NEXT_GAME } from '$lib/server/dictionaryAPI.js';
import { redirect, fail } from '@sveltejs/kit';

export async function load({ url }) {
    const gameId = url.searchParams.get("gameId");
    const currentRound = Number(url.searchParams.get("r"));
    if (!gameId) throw redirect(303, "/");

    try {
        const result = await GET_GAME_BY_ID(gameId);


        return {
            wordSet: result.nextwords,
            lives: result.lives,
            showExSentence: result.showexsentence,
            maxRounds: result.maxrounds,
            mode: result.mode,
            timer: result.timer,
            currentRound: result.currentround,
            gameId: gameId,
            randomizedAnswerOrder: shuffleWithOriginalIndex([0, 1, 2, 3])
        };
    }
    catch {
        throw redirect(303, "/error");
    }

}

export const actions = {
    submitAnswer: async ({ request }) => {


        const form = await request.formData();



        const answer = form.get("correct") === 'true';





        const gameId = getString(form, "gameId");
        if (!gameId) {
            return fail(500, {
                error: 'noWordsFound',
                message: 'couldnt get gameId'
            });
        }

        //set up next Round
        const nextRound = await GET_NEXT_GAME(answer, gameId);
        if (nextRound.rowCount === 0) {
            return fail(500, {
                error: 'noWordsFound',
                message: 'Could not generate words for this game.'
            });
        }

        //check if this was the last round
        const thisGame = nextRound;
        console.log("last round = ", thisGame.currentround, "max Rounds = ", thisGame.maxrounds)
        if (thisGame.currentround - 1 === thisGame.maxrounds || thisGame.lives === 0) {
            throw redirect(303, `/results?gameId=${gameId}`)
        }


        throw redirect(303, `/game?gameId=${gameId}`);
    }
};

function getString(form: FormData, name: string) {
    const value = form.get(name);
    if (typeof value !== "string") return null;
    return value;
}

function shuffleWithOriginalIndex(array: Array<number>) {
    // Tag each element with its original index
    const tagged = array.map((value, index) => ({
        value,
        originalIndex: index,
    }));

    // Shuffle the tagged array (Fisher–Yates)
    for (let i = tagged.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
    }

    return tagged;
}