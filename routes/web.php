<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
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
Route::middleware(['auth', 'verified', 'role:'.RolesEnum::User->value])->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Post Routes
    Route::resource('features', FeatureController::class)
     ->except(['show', 'index'])
     ->middleware('can:' . PermissionsEnum::ManageFeatures->value);

    Route::get('/features', [FeatureController::class, 'index'])
      ->name('features.index');
    Route::get('/features/{feature}', [FeatureController::class, 'show'])
      ->name('features.show');

    // Voting Routes
    Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])
      ->name('upvote.store');
    Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])
      ->name('upvote.destroy');

    // Comment Routes
    Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])
      ->middleware('can:' . PermissionsEnum::ManageComments->value)  
      ->name('comment.store');
    Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
      ->middleware('can:' . PermissionsEnum::ManageComments->value) 
      ->name('comment.destroy');
});

require __DIR__.'/settings.php';