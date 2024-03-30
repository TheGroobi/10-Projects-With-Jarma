<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class MoviesController extends Controller
{
    //
    function searchMovie(Request $request)
    {
        $c = new Client();

        $res = $c->request('GET', 'api.themoviedb.org/3/search/movie?query=' . $request->title . '&include_adult=false&language=pl&page=' . $request->page, [
            'headers' => [
                'Authorization' => 'Bearer ' . env('MOVIE_ACCESS_TOKEN'),
                'accept' => 'application/json',
                'Content-Type' => 'application/json'
            ]
        ]);

        $b = $res->getBody()->getContents();
        $body = json_decode($b);

        return response()->json($body, 200);
    }

    function trendingMovies(Request $request)
    {
        $c = new \GuzzleHttp\Client();
        if ($request->page) {
            $res = $c->request('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=pl&page=' . $request->page, [
                'headers' => [
                    'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI4NzkzYjY5NjJiMmFkYzFhYjFkYzU3NjMzOTExNiIsInN1YiI6IjY2MDE1YmJlNzcwNzAwMDE2MzBiMDU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIRh06dIYZKdfCDZSvNXb8L7hWhbX1fMDjg_rYBwfvs',
                    'accept' => 'application/json',
                    'Content-Type' => 'application/json'
                ],
            ]);
        } else {
            $res = $c->request('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=pl', [
                'headers' => [
                    'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI4NzkzYjY5NjJiMmFkYzFhYjFkYzU3NjMzOTExNiIsInN1YiI6IjY2MDE1YmJlNzcwNzAwMDE2MzBiMDU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIRh06dIYZKdfCDZSvNXb8L7hWhbX1fMDjg_rYBwfvs',
                    'accept' => 'application/json',
                    'Content-Type' => 'application/json'
                ],
            ]);
        }

        $b = $res->getBody()->getContents();
        $body = json_decode($b);

        return response()->json($body, 200);
    }
    function movieById(Request $request)
    {
        $c = new \GuzzleHttp\Client();

        $res = $c->request('GET', 'https://api.themoviedb.org/3/movie/' . $request->movie_id . '?language=pl', [
            'headers' => [
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI4NzkzYjY5NjJiMmFkYzFhYjFkYzU3NjMzOTExNiIsInN1YiI6IjY2MDE1YmJlNzcwNzAwMDE2MzBiMDU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIRh06dIYZKdfCDZSvNXb8L7hWhbX1fMDjg_rYBwfvs',
                'accept' => 'application/json',
                'Content-Type' => 'application/json'
            ],
        ]);

        $b = $res->getBody()->getContents();
        $body = json_decode($b);

        return response()->json($body, 200);
    }
    function getCast(Request $request)
    {
        $c = new \GuzzleHttp\Client();

        $res = $c->request('GET', 'https://api.themoviedb.org/3/movie/' . $request->movie_id . '/credits?language=pl', [
            'headers' => [
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI4NzkzYjY5NjJiMmFkYzFhYjFkYzU3NjMzOTExNiIsInN1YiI6IjY2MDE1YmJlNzcwNzAwMDE2MzBiMDU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIRh06dIYZKdfCDZSvNXb8L7hWhbX1fMDjg_rYBwfvs',
                'accept' => 'application/json',
                'Content-Type' => 'application/json'
            ],
        ]);

        $b = $res->getBody()->getContents();
        $body = json_decode($b);

        return response()->json($body, 200);
    }
    function getImages(Request $request)
    {
        $c = new \GuzzleHttp\Client();

        $res = $c->request('GET', 'https://api.themoviedb.org/3/movie/' . $request->movie_id . '/images', [
            'headers' => [
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI4NzkzYjY5NjJiMmFkYzFhYjFkYzU3NjMzOTExNiIsInN1YiI6IjY2MDE1YmJlNzcwNzAwMDE2MzBiMDU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIRh06dIYZKdfCDZSvNXb8L7hWhbX1fMDjg_rYBwfvs',
                'accept' => 'application/json',
                'Content-Type' => 'application/json'
            ],
        ]);

        $b = $res->getBody()->getContents();
        $body = json_decode($b);

        return response()->json($body, 200);
    }
    function getTrailerURL(Request $request)
    {
        $c = new \GuzzleHttp\Client();

        $res = $c->request('GET', 'https://api.themoviedb.org/3/movie/' . $request->movie_id . '/videos?language=pl', [
            'headers' => [
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI4NzkzYjY5NjJiMmFkYzFhYjFkYzU3NjMzOTExNiIsInN1YiI6IjY2MDE1YmJlNzcwNzAwMDE2MzBiMDU5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIRh06dIYZKdfCDZSvNXb8L7hWhbX1fMDjg_rYBwfvs',
                'accept' => 'application/json',
                'Content-Type' => 'application/json'
            ],
        ]);

        $b = $res->getBody()->getContents();
        $body = json_decode($b);

        return response()->json($body, 200);
    }
}
