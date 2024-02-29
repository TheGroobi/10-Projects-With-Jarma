import db from '$lib/server/db'

export async function load({ params }) {
const recipe = await db.select('*').from('recipes').where('id', params.recipe_id).first();
const directions = await db.select('*').from('directions').where('recipe_id', params.recipe_id);
const ingredients = await db.select('*').from('ingredients').where('recipe_id', params.recipe_id);
    return {
        recipe,
        directions,
        ingredients
    };
};