import { Pool } from 'pg';
import { env } from '$env/dynamic/private';

export const db = new Pool({
  connectionString: env.POSTGRES_URL,
  ssl: env.POSTGRES_URL.includes('localhost')
    ? false
    : { rejectUnauthorized: false }
});