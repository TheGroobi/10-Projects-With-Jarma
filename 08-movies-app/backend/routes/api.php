<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\endpoint;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/trending', [endpoint::class, 'trendingMovies']);
Route::get('/search', [endpoint::class, 'searchMovie']);
