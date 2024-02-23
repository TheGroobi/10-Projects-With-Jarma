/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
};

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        return { 
            nMaxPoints: data.get("maxPoints"),
            nPoints: data.get("score")
        }
    }
}