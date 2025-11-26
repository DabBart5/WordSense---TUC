import Database from "better-sqlite3";
import fs from "node:fs";

/**
 * @param {{ language: any; word: any; gender: string; pronunciation: any; definition: any; synonym: any; exSentence: any; wordType: any; difficulty: any; transitivity: any; notes: string; }} w
 */
function normalizeWordEntry(w) {
    return {
        language: w.language ?? "Unknown",
        word: w.word ?? "",
        gender: w.gender && w.gender !== "none" ? w.gender : null,
        pronunciation: w.pronunciation || null,

        definition: typeof w.definition === "string"
            ? w.definition
            : JSON.stringify(w.definition),

        synonym: Array.isArray(w.synonym)
            ? JSON.stringify(w.synonym)
            : "[]",

        exSentence: Array.isArray(w.exSentence)
            ? JSON.stringify(w.exSentence)
            : "[]",

        wordType: w.wordType ?? null,
        difficulty: w.difficulty ?? "Unknown",

        transitivity: w.transitivity ? 1 : 0,

        notes: w.notes?.trim() ? w.notes : null
    };
}

export function seedDB() {
    const db = new Database("wordsense/TestProjekt/src/lib/server/dictionary.db");

    const insert = db.prepare(`
        INSERT INTO dictionary (
            language, word, gender, pronunciation,
            definition, synonym, exSentence, wordType,
            difficulty, transitivity, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const text = fs.readFileSync("wordsense/TestProjekt/src/lib/scripts/dicts/English_B2_half.json", "utf8");
    const words = JSON.parse(text);

    for (const raw of words) {
        const w = normalizeWordEntry(raw);

        insert.run(
            w.language,
            w.word,
            w.gender,
            w.pronunciation,
            w.definition,
            w.synonym,
            w.exSentence,
            w.wordType,
            w.difficulty,
            w.transitivity,
            w.notes
        );

        console.log("Inserted:", w.word);
    }

    console.log("Dictionary seeded!");
}