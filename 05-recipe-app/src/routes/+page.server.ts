import db from '$lib/server/db'

export const load = async ({ params }) => {
    const recipes = await db.select('*').from('recipes');
    return { recipes };
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const inputValue = data.get('search')?.toString().toLowerCase();
        const recipesFiltered = await db.select('*').from('recipes').where('name', 'LIKE', `%${inputValue}%`);
        return { recipesFiltered }
    }
};
