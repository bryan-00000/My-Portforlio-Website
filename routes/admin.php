<?php

use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SkillController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::resource('skills', SkillController::class)->except(['show', 'create', 'edit']);
    Route::resource('services', ServiceController::class)->except(['show', 'create', 'edit']);

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [MessageController::class, 'show'])->name('messages.show');
    Route::patch('messages/{message}/read', [MessageController::class, 'markRead'])->name('messages.read');
    Route::delete('messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
});
