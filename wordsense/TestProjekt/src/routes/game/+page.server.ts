
export type GameData = {
    words: any[] | null;
};


// src/routes/game/+page.server.ts
export function load({ cookies }) {
    const raw = cookies.get('mydata');

    return {
        words: raw ? JSON.parse(raw) : null
    };
}