
import db from "../server/db.js";

function getWordByWord(word: string, language: string, difficulty: string) {
    const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE language = ?
          AND difficulty = ?
          AND word = ?
    `);

    return stmt.get(language, difficulty, word);
}



console.log(getWordByWord("motivation", "English", "B2"));