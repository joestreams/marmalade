<?php

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $user = request()->user();

    return view('welcome')->with(['user' => $user]);
});

Route::get('/auth/{provider}/redirect', function (string $provider) {
    $socialite = Socialite::driver($provider);

    $scopes = [];

    if ($provider === "spotify") {
        $scopes = ['user-read-private', 'user-read-email'];
    }

    if (count($scopes) > 0) {
        $socialite = $socialite->scopes($scopes);
    }

    return $socialite->redirect();
});

Route::get('/auth/{provider}/callback', function (string $provider) {
    $authUser = Socialite::driver($provider)->user();

    $user = User::where('auth_id', $authUser->id)->first();

    if ($user) {
        $user->update([
            'auth_token' => $authUser->token,
            'auth_refresh_token' => $authUser->refreshToken,
        ]);
    } else {
        $user = User::create([
            'name' => $authUser->name,
            'email' => $authUser->email,
            'auth_type' => $provider,
            'auth_id' => $authUser->id,
            'auth_token' => $authUser->token,
            'auth_refresh_token' => $authUser->refreshToken,
            'avatar' => $authUser->avatar,
        ]);
    }

    Auth::login($user);

    return redirect('/');
});
