<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
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

    Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])
      ->name('upvote.store');
    Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])
      ->name('upvote.destroy');

    Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
      ->name('comment.store');
    Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
      ->name('comment.destroy');
});

require __DIR__.'/settings.php';
