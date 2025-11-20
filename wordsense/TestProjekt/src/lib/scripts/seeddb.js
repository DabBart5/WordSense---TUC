import Database from 'better-sqlite3';

export function seedDB() {
    const db = new Database('dictionary.db');

    const insert = db.prepare(`
    INSERT INTO dictionary (
        language, word, gender, pronunciation,
        definition, synonym, exSentence,
        wordType, difficulty, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

    // Example seed data:
    const seedWords = [
        {
            language: "en",
            word: "run",
            gender: null,
            pronunciation: "/rʌn/",
            definition: ["to move swiftly on foot", "to operate or function"],
            synonym: ["sprint", "jog", "operate"],
            exSentence: ["I run every morning.", "The machine is running smoothly."],
            wordType: "verb",
            difficulty: "A2",
            notes: "Highly irregular verb."
        },
        {
            language: "en",
            word: "beautiful",
            gender: null,
            pronunciation: "/ˈbjuːtəfəl/",
            definition: ["pleasing the senses or mind aesthetically"],
            synonym: ["attractive", "lovely", "pretty"],
            exSentence: ["The sunset is beautiful."],
            wordType: "adjective",
            difficulty: "A2",
            notes: ""
        }
    ];

    for (const w of seedWords) {
        insert.run(
            w.language,
            w.word,
            w.gender,
            w.pronunciation,
            JSON.stringify(w.definition),
            JSON.stringify(w.synonym),
            JSON.stringify(w.exSentence),
            w.wordType,
            w.difficulty,
            w.notes
        );
    }

    console.log("Dictionary seeded!");

}
