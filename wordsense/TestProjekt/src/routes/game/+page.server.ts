import { availableDifficulties } from '$lib/constData.js';
import { GET_GAME_BY_ID, GET_NEXT_GAME } from '$lib/server/dictionaryAPI.js';
import { redirect, fail } from '@sveltejs/kit';
import type {Actions} from './$types';

export async function load({ depends,url }) {

        depends("game:state");
    console.log("in load")
    const gameId = url.searchParams.get("gameId");

    if (!gameId) throw redirect(303, "/");


        const result = await GET_GAME_BY_ID(gameId);

        console.log(result)

    try{
        console.log("about to return data")
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
    catch{
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
        console.log("about to send data to the server")
        const nextRound = await GET_NEXT_GAME(answer, gameId);
        if (nextRound.rowCount === 0) {
            return fail(500, {
                error: 'noWordsFound',
                message: 'Could not generate words for this game.'
            });
        }

        console.log("data in server updated, current word= ", nextRound.nextwords[0])

        //check if this was the last round
        const thisGame = nextRound;

        console.log("last round = ", thisGame.currentround, "max Rounds = ", thisGame.maxrounds)
        if (thisGame.maxrounds > 0){ //mode != free
            if (((thisGame.currentround - 1 >= thisGame.maxrounds)&& thisGame.maxrounds > 0) || thisGame.lives === 0) {
                throw redirect(303, `/game/results?gameId=${gameId}`)
            }
        }
        else { //mode = free
            if (thisGame.lives === 0) { //extra because maxrounds in free is -1 and I wanted to use greater than for checking if it was the last round
                throw redirect(303, `/game/results?gameId=${gameId}`)
            }
        }


        // throw redirect(303, `/game?gameId=${gameId}`);
        return {success: true};
    }
}satisfies Actions;

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