<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Artist;
use App\Http\Controllers\Controller;

class ArtistsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $artist = $request->artist;

        $genres = count($artist['genres']) > 0 ? implode(', ', $artist['genres']) : null;
        $image = count($artist['images']) > 0 ? $artist['images'][0]['url'] : null;

        $data = [
            'name' => $artist['name'],
            'genres' => $genres,
            'image' => $image,
            'spotify_id' => $artist['id'],
            'spotify_uri' => $artist['uri'],
            'spotify_api_href' => $artist['href'],
            'spotify_web_url' => $artist['external_urls']['spotify'],
            'spotify_popularity' => $artist['popularity'],
            'spotify_followers_count' => $artist['followers']['total'],
        ];

        $artistRecord = Artist::create($data);

        $user->artists()->attach($artistRecord, ['is_owner' => true]);

        return $artistRecord;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
