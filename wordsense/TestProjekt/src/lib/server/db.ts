import { Pool } from 'pg';
import { env } from '$env/dynamic/private';

export const db = new Pool({
  connectionString: env.DATABASE_URL,
  // This reads the "false" we set in docker-compose.yml
  ssl: env.DB_SSL === 'true' 
    ? { rejectUnauthorized: false } 
    : false
});