// Import the Better-SQLite3 module
import Database from "better-sqlite3";

export const db = new Database('dictionary.db');

db.exec(`
CREATE TABLE IF NOT EXISTS dictionary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language TEXT NOT NULL,
    word TEXT NOT NULL,
    gender TEXT,
    pronunciation TEXT,
    definition TEXT NOT NULL,
    synonym TEXT,
    exSentence TEXT,
    wordType TEXT,
    difficulty TEXT NOT NULL,
    notes TEXT
);
`);

export default db;