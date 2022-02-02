<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'genres',
        'image',
        'spotify_id',
        'spotify_uri',
        'spotify_api_href',
        'spotify_web_url',
        'spotify_popularity',
        'spotify_followers_count',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withTimestamps();
    }

    public function owners()
    {
        return $this->belongsToMany(User::class)
            ->wherePivot('is_owner', true)
            ->withTimestamps();
    }
}
