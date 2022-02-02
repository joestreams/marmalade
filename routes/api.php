<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Spotify\Search\ArtistsController;
use App\Http\Controllers\Api\LogoutController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth')->group(function () {
    Route::post('/logout', LogoutController::class)->middleware('auth');

    Route::get('/spotify/search/artists', ArtistsController::class);
});
