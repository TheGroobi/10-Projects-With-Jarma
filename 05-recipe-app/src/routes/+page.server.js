/** @type {import('./$types').PageServerLoad} */
import db from '$lib/server/db' 



export async function load() {
const recipes = await db.select('*').from('recipes');
    return {
        recipes
    };
};