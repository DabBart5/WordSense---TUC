import { fail } from "@sveltejs/kit";
import { CLEAN_GAMES, GET_RANDOM, NEW_GAME } from "./dictionaryAPI";
import { availableDifficulties, availableLanguages, availableModes, maxTimer, minTimer } from "$lib/constData";

export async function startNewGame(form: FormData){

            //clean up whenever a new game is started

            console.log(" -trying to start new game")
            CLEAN_GAMES();
    
            console.log(form)
            // validate form
            if (checkData(form) !== 0) {
                return fail(400, {
                    error: 'invalidInput',
                    message: 'invalid input'
                });
            }

            console.log("  -got a form");
            // extract form values
            const language = getString(form, 'language');
            const difficulty = getString(form, 'difficulty');
            const isTimer = getString(form, "isTimer") === 'true';
            const maxRounds = getString(form, "isFree") === 'true' ? -1 : 10;
            const showExSentence = getString(form, "showExSentence") === 'true';
            const timerVal = isTimer ? Number(getString(form, 'timerval')): -1;
            const mode = getString(form, 'mode');
    
    
            // console.log("mode = ", mode);
            
            // console.log("timerVal = ", timerVal);
            // console.log("maxRounds = ", maxRounds);
            
            // console.log("showExSentence = ", showExSentence);
            
            // console.log("difficulty = ", difficulty);
            // console.log("language = ", language);

            console.log("langage = ", language, " mode = ", mode, " diff = ", difficulty);
    
            if (!language || !difficulty || !mode) {
                return fail(400, {
                    error: 'invalidInput',
                    message: 'invalid input'
                });
            }

            
            console.log("  -passed invalid input");
    
            // fetch 4 words
            const words = await GET_RANDOM(language, difficulty);
            if (!words) {
                return fail(500, {
                    error: 'noWordsFound',
                    message: 'Could not generate words for this game.'
                });
            }
            
            console.log("  -got random words");
    
            const wordSet = await words.json();
            // console.log(data)
    
            // create Game, get id
            const gameId = await NEW_GAME(wordSet, timerVal, mode, showExSentence, maxRounds, 5, language, difficulty);
    
            
            console.log("  -got a new game");
            return gameId;
}

function getString(form: FormData, name: string) {
    const value = form.get(name);
    if (typeof value !== "string") return null;
    return value;
}

function checkData(data: FormData) {
    let i = 0;
    console.log(i = i+1)
    const language = getString(data, 'language');
    if (language === null) return -1;
    if (!availableLanguages.includes(language)) return -1;

    console.log(i = i+1)

    const difficulty = getString(data, 'difficulty');
    if (difficulty === null) return -1;
    if (!availableDifficulties.includes(difficulty)) return -1;// difficulty is part of accepted difficulties

    console.log(i = i+1)

    const mode = getString(data, 'mode');
    if (mode === null) return -1;
    if (!availableModes.includes(mode)) return -1;//mode is part of possible modes

    console.log(i = i+1)

    const timer = getString(data, 'timerval');

    console.log(timer)
    if (timer === null) return -1;

    if (Number(timer) != -1){
         if ((Number(timer) < minTimer || Number(timer) > maxTimer)) return -1; //timervalue lies between max and min
    }
   
    console.log(i = i+1)

    const isTimer = getString(data, 'isTimer');
    if (isTimer === null) return -1;
    if (!(isTimer === "true" || isTimer === "false")) return -1;

    console.log(i = i+1)


    return 0;
}