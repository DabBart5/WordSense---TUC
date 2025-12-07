CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS games (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    priorwords JSONB,
    lives INTEGER,
    maxrounds INTEGER,
    mode VARCHAR(20),
    showexsentence BOOLEAN,
    timer INTEGER,
    nextwords JSONB NOT NULL,
    currentround INTEGER,
    roundswon INTEGER[] NOT NULL DEFAULT '{}'::int[],
    language VARCHAR(20),
    difficulty VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dictionary (
    id SERIAL PRIMARY KEY,
    language TEXT NOT NULL,
    word TEXT NOT NULL,
    gender VARCHAR(20),
    pronunciation TEXT,
    definition TEXT,
    synonym JSONB,
    exSentence JSONB,
    wordtype VARCHAR(20),
    difficulty VARCHAR(20),
    transitivity BOOLEAN,
    notes VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    issue VARCHAR(300) NOT NULL,
    details VARCHAR(300)
);
