import { fail } from "@sveltejs/kit";
import { CLEAN_GAMES, GET_RANDOM, NEW_GAME } from "./dictionaryAPI";
import { availableDifficulties, availableLanguages, availableModes, maxTimer, minTimer } from "$lib/constData";

export async function startNewGame(form: FormData){

            //clean up whenever a new game is started
            CLEAN_GAMES();

            //console.log(form)
            // console.log("isTimer = ", getString(form, "isFree"), ", timer = ", getString(form, "showExSentence") )
          
            // validate form
            if (checkData(form) != 0) {
                return -1;
            }

            // extract form values
            const language = getString(form, 'language');
            const difficulty = getString(form, 'difficulty');
            const maxRounds = getString(form, "isFree") === 'true' ? -1 : 10;
            const showExSentence = getString(form, "showExSentence") === 'true';
            const mode = getString(form, 'mode');

            const timer = getString(form, "timer");
            let tmp = -1;
            if(timer === 'auto') {
                tmp = -2;
            } else if (timer === 'none') {
                tmp = -1;
            } else if (timer === "timer") {
                tmp = Number(getString(form, 'timerval'));
            }
            else console.log("unexpected error, timer is not part of acceptable values, check failed, i hope this never happens, so i am letting this comment in here")
            const timerVal = tmp;

            if (!language || !difficulty || !mode) {
                return -2;
            }
    
            // fetch 4 words
            // i should really put this into the new game function...
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

    //console.log("before timer check in check data")
    const timer = getString(data, 'timer');
    if (timer != 'timer' && timer != 'auto' && timer != 'none') return -1;

    const timerVal = getString(data, 'timerval');
    
    if (timerVal === null) return -1;

    //console.log("before timerval check")
    if (Number(timerVal) > -1){ //changed
         if ((Number(timerVal) < minTimer || Number(timerVal) > maxTimer)) return -1; //timervalue lies between max and min
    }

    return 0;
}