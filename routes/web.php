<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [VisitorController::class, 'index'])->name('dashboard');

Route::get('/kursi', function () {
  return Inertia::render('Kursi/index');
})->middleware(['auth', 'verified'])->name('kursi');

Route::get('/registrasi', function () {
  return Inertia::render('Registrasi/index');
})->middleware(['auth', 'verified'])->name('registrasi');
// Route::get('/dashboard', [VisitorController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
  // Route::get('/kursi/{id}', [VisitorController::class, 'edit'])->name('profile.edit');
  Route::patch('/kursi/{id}', [VisitorController::class, 'update'])->name('kursi.update');
  Route::delete('/kursi/{id}', [VisitorController::class, 'destroy'])->name('kursi.destroy');
});
require __DIR__ . '/auth.php';
