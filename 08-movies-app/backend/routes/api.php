<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MoviesController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/trending', [MoviesController::class, 'trendingMovies']);
Route::get('/search', [MoviesController::class, 'searchMovie']);
