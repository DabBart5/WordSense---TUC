CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS games (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    priorwords JSONB,
    lives INTEGER,
    maxrounds INTEGER,
    mode TEXT,
    showexsentence BOOLEAN,
    timer INTEGER,
    nextwords JSONB NOT NULL,
    currentround INTEGER,
    roundsWon INTEGER[] NOT NULL DEFAULT '{}'::int[],
    language TEXT,
    difficulty TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dictionary (
    id SERIAL PRIMARY KEY,
    language TEXT NOT NULL,
    word TEXT NOT NULL,
    gender TEXT,
    pronunciation TEXT,
    definition TEXT,
    synonym JSONB,
    exSentence JSONB,
    wordType TEXT,
    difficulty TEXT,
    transitivity BOOLEAN,
    notes TEXT
);
