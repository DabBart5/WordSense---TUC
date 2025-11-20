import db from '../server/db.server.js'
import {seedDB} from './seeddb.js';

function getWordByWord(word : string, language:string, difficulty:string){
    const stmt = db.prepare(`SELECT *
                            FROM dictionary
                            WHERE language = ?
                            AND difficulty = ?
                            AND word = ?
`);
    const rows = stmt.get(language, difficulty, word);

    console.log(rows);
}

//seedDB();
console.log(getWordByWord("beautiful", "en", "A2"));