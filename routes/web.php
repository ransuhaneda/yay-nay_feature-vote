<?php

use App\Http\Controllers\FeatureController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Route::redirect('/', '/dashboard')->name('home');

// needed to access dashboard. user must be auth & verified
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::resource('features', FeatureController::class);
});

require __DIR__.'/settings.php';
