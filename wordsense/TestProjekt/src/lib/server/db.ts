import { Pool } from 'pg';
import { POSTGRES_URL } from '$env/static/private';

export const db = new Pool({
    
    connectionString: POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    
});