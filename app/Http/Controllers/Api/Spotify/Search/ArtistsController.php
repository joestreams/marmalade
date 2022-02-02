<?php

namespace App\Http\Controllers\Api\Spotify\Search;

use Illuminate\Http\Request;
use App\Services\Api\Spotify;
use App\Http\Controllers\Controller;

class ArtistsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $spotify = new Spotify($request->user());

        return $spotify->findArtists($request->query("q"))->artists->items;
    }
}
