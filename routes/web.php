<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects');
Route::get('/services', [PortfolioController::class, 'services'])->name('services');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('contact');
Route::post('/contact', [PortfolioController::class, 'submitContact'])
    ->middleware('throttle:5,1')
    ->name('contact.submit');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
