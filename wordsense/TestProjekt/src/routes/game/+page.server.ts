import { availableDifficulties, getAverageSizeOfWord } from '$lib/constData.js';
import { GET_GAME_BY_ID, GET_NEXT_GAME, INSERT_INTO_REPORTS } from '$lib/server/dictionaryAPI.js';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';


export async function load({ depends, url }) {

    depends('game:state');
    const gameId = url.searchParams.get("gameId");

    if (!gameId) throw redirect(303, "/");


    const result = await GET_GAME_BY_ID(gameId);

    const timerVal = calcTimerVal(Number(result.timer), result.nextwords, result.showexsentence, result.language);


    try {
        return {
            wordSet: result.nextwords,
            lives: result.lives,
            showExSentence: result.showexsentence,
            maxRounds: result.maxrounds,
            mode: result.mode,
            timer: timerVal,
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
            return fail(422, {
                error: 'noWordsFound',
                message: 'couldnt get gameId from User'
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

        if (thisGame.maxrounds > 0) { //mode != free
            if (((thisGame.currentround - 1 >= thisGame.maxrounds) && thisGame.maxrounds > 0) || thisGame.lives === 0) {
                throw redirect(303, `/game/results?gameId=${gameId}`)
            }
        }
        else { //mode = free
            if (thisGame.lives === 0) { //extra because maxrounds in free is -1 and I wanted to use greater than for checking if it was the last round
                throw redirect(303, `/game/results?gameId=${gameId}`)
            }
        }


        // throw redirect(303, `/game?gameId=${gameId}`);
        return { success: true };
    },
    report: async ({ request }) => {
        const form = await request.formData();

        const option = getString(form, "reason");
        if (!option || option === '') {
            console.log("failed to read reason")
            return;
        }

        const details = getString(form, "details");

        const res = await INSERT_INTO_REPORTS(option, details);

        if (res < 0) {//this doesnt really do anything, because popup closes before anything is visible (maybe take out later)
            return { success: false, data: "something went wrong" };
        }

        return { success: true }

    }
} satisfies Actions;

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

function calcTimerVal(timerVal : number, wordSet: any, showExSentence: boolean, language: string){

    if (timerVal != -2) return timerVal; // is not auto
    let totalLength = 0;
    wordSet.forEach((word: { definition: string; }) => {
        totalLength += word.definition.length;
    });

    if (showExSentence) {
        if (wordSet[0].exsentence != null){
            totalLength += wordSet[0].exsentence.length;
        }
    }
    let averageWordSize = 3; //if i cant make a better guess, assume a short word size
    if(language != null){
        const result = getAverageSizeOfWord(language);
        if(result != null){
            averageWordSize = result;
        }
    }

    console.log("average word size for ",language,": ", averageWordSize);

    const estimatedWordCount = (totalLength/averageWordSize) * 5/6; //average of five characters per word in english, this may not be applicable to other languages, excluding empty spaces
    const estimatedSecondsPerWord = 0.3; //0.2s per word estimated for a native speaker, learner estimated 50% slower

    const estimatedTimeNeeded = estimatedWordCount * estimatedSecondsPerWord + 3; //absolute value at the end as time to think (some base leeway)
    console.log("calculated time: ",estimatedTimeNeeded)
    return estimatedTimeNeeded;
}