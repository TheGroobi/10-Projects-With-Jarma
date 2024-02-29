import db from '$lib/server/db'

export async function load() {
    const recipes = await db.select('*').from('recipes');
    return { recipes };
};

export const actions = {
    default: async ({ request }) => {
        const recipes = await db.select('*').from('recipes');
        const data = await request.formData();
        const inputValue = data.get('search')?.toString().toLowerCase();
        const recipesFiltered = await db.select('*').from('recipes').where('name', 'LIKE', `%${inputValue}%`);
        return { recipes, recipesFiltered }
    }
};
