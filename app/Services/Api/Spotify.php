<?php

namespace App\Services\Api;

use SpotifyWebAPI\SpotifyWebAPI;
use SpotifyWebAPI\Session;
use App\Models\User;

class Spotify
{
    private $client;

    public function __construct(User $user)
    {
        $config = config('services.spotify');

        $session = new Session($config['client_id'], $config['client_secret'], $config['redirect']);
        $this->client = new SpotifyWebAPI();
        $this->client->setAccessToken($user->auth_token);
    }

    public function me()
    {
        return $this->client->me();
    }

    public function findArtists(string $query)
    {
        return $this->client->search($query, "artist");
    }
}
