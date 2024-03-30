

export async function load() {
    const res = await fetch('http://127.0.0.1:8000/api/trending');
    const movies = await res.json();

    return { movies };
}

export const actions = {
	page: async ({ request }) => {
        const data = await request.formData();
        const page = data.get('page');

        const res = await fetch('http://127.0.0.1:8000/api/trending?page=' + page);
        const movies = await res.json();
        return { updatedMovies: movies };
    },
    search: async ({ request }) => {
        const data = await request.formData();
        console.log(data)
        const title = data.get('title');
        
        const res = await fetch('http://127.0.0.1:8000/api/search?title=' + title)
        const movies = await res.json();
        return { updatedMovies: movies}
    }
}