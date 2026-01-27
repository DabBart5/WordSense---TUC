// src/hooks.server.ts
import { seedDictionary } from '$lib/server/seed';

console.log('Server starting... attempting to seed database.');

// Fire the seed function immediately upon server startup
seedDictionary();

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);
	return response;
}