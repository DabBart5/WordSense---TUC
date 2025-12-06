import { fail } from "@sveltejs/kit";
import { CLEAN_GAMES, GET_RANDOM, NEW_GAME } from "./dictionaryAPI";
import { availableDifficulties, availableLanguages, availableModes, maxTimer, minTimer } from "$lib/constData";

export async function startNewGame(form: FormData){

            //clean up whenever a new game is started
            CLEAN_GAMES();

            // console.log("isTimer = ", getString(form, "isTimer"), ", timer = ", getString(form, "timerval") )
            // console.log("isTimer = ", getString(form, "isFree"), ", timer = ", getString(form, "showExSentence") )
          
            // validate form
            if (checkData(form) != 0) {
                return -1;
            }

            // extract form values
            const language = getString(form, 'language');
            const difficulty = getString(form, 'difficulty');
            const isTimer = getString(form, "isTimer") === 'true';
            const maxRounds = getString(form, "isFree") === 'true' ? -1 : 10;
            const showExSentence = getString(form, "showExSentence") === 'true';
            const timerVal = isTimer ? Number(getString(form, 'timerval')): -1;
            const mode = getString(form, 'mode');


    
            if (!language || !difficulty || !mode) {
                return -2;
            }
    
            // fetch 4 words
            const words = await GET_RANDOM(language, difficulty);
            if (!words) {
                return -3;
            }
        
    
            const wordSet = await words.json();
            // console.log(data)
    
            // create Game, get id
            const gameId = await NEW_GAME(wordSet, timerVal, mode, showExSentence, maxRounds, 5, language, difficulty);
    
            return gameId;
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

    if (Number(timer) != -1){
         if ((Number(timer) < minTimer || Number(timer) > maxTimer)) return -1; //timervalue lies between max and min
    }

    return 0;
}