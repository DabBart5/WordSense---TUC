import { db } from './db';
import fs from 'fs/promises';
import path from 'path';

export async function seedDictionary() {
    try {
        // 1. Check for existing data
        const check = await db.query('SELECT id FROM dictionary LIMIT 1');
        if (check.rowCount && check.rowCount > 0) {
            console.log("Dictionary already has data. Skipping seed.");
            return;
        }

        console.log("Starting database seed...");

        // 2. Use process.cwd() to ensure we find the folder inside the Docker container
        const dbDirectory = path.resolve(process.cwd(), 'db'); 
        
        const jsonFiles = [
            'A1-final.json', 'A2-final.json', 'B1-final.json',
            'B2-final.json', 'C1-final.json', 'C2-final.json'
        ];

        for (const fileName of jsonFiles) {
            const filePath = path.join(dbDirectory, fileName);
            console.log(`Reading file: ${filePath}`);

            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const data = JSON.parse(fileContent);
                console.log(`🚀 Inserting ${data.length} entries from ${fileName}...`);

                for (const item of data) {
                    if (item.reviewed !== true) { continue; }  // skip unreviewed entries
                    await db.query(
                        `INSERT INTO dictionary (
                            language, word, gender, pronunciation, definition, 
                            synonym, exsentence, wordtype, difficulty, 
                            transitivity, notes
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                        [
                            item.language,
                            item.word,
                            item.gender || null,        // Handle missing gender
                            item.pronunciation || null,
                            item.definition,
                            // specific fix: ensure we don't stringify "undefined"
                            JSON.stringify(item.synonym || []),     
                            // specific fix: check casing (exSentence vs exsentence)
                            JSON.stringify(item.exSentence || item.exsentence || []), 
                            item.wordType || item.wordtype, // Handle casing differences
                            item.difficulty,
                            item.transitivity || false,
                            item.notes || null
                        ]
                    );
                }
            } catch (fileErr) {
                console.error(`❌ Error reading or parsing ${fileName}:`, fileErr);
            }
        }
        console.log("✅ Database successfully seeded!");
    } catch (error) {
        console.error("❌ Seeding CRITICAL failure:", error);
    }
}