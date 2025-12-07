import { readFileSync } from 'fs';
import { Client } from 'pg';

// Load JSON file
const data = JSON.parse(readFileSync('./db/C2.json', 'utf8'));

for (const entry of data) {
    // console.log("TRANSITIVITY:", JSON.stringify(entry.transitivity));
    // ... insert logic ...
}

// PostgreSQL client
const client = new Client({
    user: 'devuser',
    password: 'devpassword',
    host: 'localhost',
    port: 5432,
    database: 'dictionary_game'
});

// Utility: flatten synonyms if nested
function normalizeSynonyms(syn: any) {
    if (Array.isArray(syn) && syn.length === 1 && Array.isArray(syn[0])) {
        return syn[0];             // unwrap [["a","b"]] → ["a","b"]
    }
    return syn;                    // leave as-is if already correct
}

async function seed() {
    await client.connect();

    console.log(`Seeding ${data.length} dictionary entries...\n`);

    

    for (const entry of data) {

        console.log("TRANSITIVITY:", entry.transitivity);

        const flatSynonyms = normalizeSynonyms(entry.synonym);

        await client.query(
            `
            INSERT INTO dictionary
            (
                language,
                word,
                gender,
                pronunciation,
                definition,
                synonym,
                exsentence,
                wordType,
                difficulty,
                transitivity,
                notes
                
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            `,
            [
                entry.language,
                entry.word,
                entry.gender,
                entry.pronunciation,
                entry.definition,
                JSON.stringify(flatSynonyms),
                JSON.stringify(entry.exSentence),
                entry.wordType,
                entry.difficulty,
                entry.transitivity,
                entry.notes
            ]
        );
    }

    console.log("Seeding completed.");
    await client.end();
}

seed().catch(err => {
    console.error("Error seeding database:", err);
    process.exit(1);
});