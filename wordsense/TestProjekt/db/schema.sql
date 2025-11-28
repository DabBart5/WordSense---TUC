CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB NOT NULL,
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
