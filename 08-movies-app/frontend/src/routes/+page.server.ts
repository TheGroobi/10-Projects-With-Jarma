

export async function load() {
    const res = await fetch('http://127.0.0.1:8000/api/trending');
    const movies = await res.json();

    return { movies };
}

export const actions = {
	page: async ({ request }) => {
    },
}