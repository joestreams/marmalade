<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('genres')->nullable();
            $table->string('image')->nullable();
            $table->string('spotify_id')->nullable();
            $table->string('spotify_uri')->nullable();
            $table->string('spotify_api_href')->nullable();
            $table->string('spotify_web_url')->nullable();
            $table->unsignedTinyInteger('spotify_popularity')->nullable();
            $table->unsignedInteger('spotify_followers_count')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artists');
    }
}
