import db from "./db.server.js";

export function getWordByWord(word: string, language: string, difficulty: string) {
    
    const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE language = ?
          AND difficulty = ?
          AND word = ?
    `);

    return stmt.get(language, difficulty, word);
}

export function getWordById(id: number){
    const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE id = ?
    `);

    return stmt.get(id);
}

export function getXRandomWords(x: number, language: string, difficulty:String){
    let rows;
    if (difficulty === ""){
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

export function get20WordsByWordtype(language: string, wordtype: string, difficulty: string){

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

export function getGameSetStandard(language: string, difficulty: string){
        const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE language = ?
        AND difficulty = ?
        ORDER BY RANDOM()
        LIMIT 40
    `);

    console.log(stmt.all(language, difficulty))
    return stmt.all(language, difficulty);
}
export function getAll(language: string){
            const stmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE language = ?
    `);

    console.log(stmt.all(language))
    return stmt.all(language);
}