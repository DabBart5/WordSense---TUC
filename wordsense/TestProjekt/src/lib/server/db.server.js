// db.server.js
import Database from "better-sqlite3";

export const DB_PATH = "wordsense/TestProjekt/src/lib/server/dictionary.db";

// Create/open DB
export const db = new Database(DB_PATH);

// Create table once
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
    transitivity INTEGER NOT NULL,
    notes TEXT
);
`);

export default db;
