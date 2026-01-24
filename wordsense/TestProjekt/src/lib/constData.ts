import { locale, type Locale } from "../stores/i18n";

export const availableDifficulties = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const availableModes = ['word', 'definition'];
export const maxTimer = 100;
export const minTimer = 5;
export const wordTypes = ['noun', 'verb', 'adjective']; //conjunction exists as well, but just once (not enough for a wordset), gets left out for now, need to think about this again
export const availableLanguages = ["English", "Deutsch"] ;
export const afterTransVerbs = {
    "English": "sth./sb.",
    "Deutsch": "etwas"
}
export const beforeTransVerbs = {
    "English": "to",
    "Deutsch": ""
}
const avgWordSizePerLanguage = {
    "English": 5.0,
    "Deutsch": 5.0,
    "Japanese": 3.0
}




//functions to access this data if necessary, typescript complains if dictionary
export function getFromLangDict(lang: string, dict: Record<string, any>) {
    if (lang in dict) {
        return dict[lang as keyof typeof dict]; // safe
    }
    return "";
}

export function getAverageSizeOfWord(lang: string){
    if (!(availableLanguages.includes(lang))) return null;
    return avgWordSizePerLanguage[lang as keyof typeof avgWordSizePerLanguage]; 
}