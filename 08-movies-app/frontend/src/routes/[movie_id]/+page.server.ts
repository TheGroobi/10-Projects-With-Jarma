export async function load({ params }) {
    const resMovie = await fetch('http://127.0.0.1:8000/api/id?movie_id=' + params.movie_id);
    const movie: Movie = await resMovie.json();

    const resCast = await fetch('http://127.0.0.1:8000/api/cast?movie_id=' + params.movie_id);
    const cast: MovieCast[] = (await resCast.json()).cast.slice(0, 9);

    const resImages = await fetch('http://127.0.0.1:8000/api/images?movie_id=' + params.movie_id);
    const images: MovieImage[] = (await resImages.json()).backdrops.slice(0, 4);
    console.log(cast)

    return { 
        movie,
        cast,
        images
    };
}