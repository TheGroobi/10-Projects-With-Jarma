<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MoviesController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/trending', [MoviesController::class, 'trendingMovies']);
Route::get('/search', [MoviesController::class, 'searchMovie']);
Route::get('/id', [MoviesController::class, 'movieById']);
Route::get('/cast', [MoviesController::class, 'getCast']);
Route::get('/images', [MoviesController::class, 'getImages']);
Route::get('/trailer', [MoviesController::class, 'getTrailerURL']);
