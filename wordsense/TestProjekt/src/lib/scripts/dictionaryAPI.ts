import db from "../server/db.server.js";

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

function getWordById(id: number){
    const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE id = ?
    `);

    return stmt.get(id);
}

function getXRandomWords(x: number, language: string, difficulty:String){
    let rows;
    if (difficulty == ""){
        const stmt = db.prepare(`
            SELECT *
            FROM dictionary
            WHERE language = ?
            ORDER BY RANDOM()
            LIMIT ?
        `);
        rows = stmt.all(language, x);
    }
    else{
        const stmt = db.prepare(`
            SELECT *
            FROM dictionary
            WHERE language = ?
            AND difficulty = ?
            ORDER BY RANDOM()
            LIMIT ?
        `);
        rows = stmt.all(language, difficulty, x);
    }

return rows;
}

function get20WordsByWordtype(language: string, wordtype: string, difficulty: string){

    const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE language = ?
        AND difficulty = ?
        AND wordtype = ?
        ORDER BY RANDOM()
        LIMIT 20
    `);
    return stmt.all(language, difficulty, wordtype);
}