
export async function load({ params }) {
    const resMovie = await fetch('http://127.0.0.1:8000/api/id?movie_id=' + params.movie_id);
    const movie: Movie = await resMovie.json();

    const resCast = await fetch('http://127.0.0.1:8000/api/cast?movie_id=' + params.movie_id);
    const cast: MovieCast[] = (await resCast.json()).cast.slice(0, 9);

    const resImages = await fetch('http://127.0.0.1:8000/api/images?movie_id=' + params.movie_id);
    const images: MovieImage[] = (await resImages.json()).backdrops.slice(0, 4);

    return { 
        movie,
        cast,
        images
    };
}

export const actions = {
	default: async ({ params }) => {
        const res = await fetch('http://127.0.0.1:8000/api/trailer?movie_id=' + params.movie_id);
        const data = await res.json();
        console.log(data.results)
        
        if (data.results.length < 1) {
            return { error: 'Ten film nie ma zwiastunu...'}
        } else {
            const key = data.results[0].key;
            const link = 'https://www.youtube.com/watch?v=' + key
            return {
                link
            }
        }
    },
}