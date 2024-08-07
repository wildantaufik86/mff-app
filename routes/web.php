<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitorController;
use App\Mail\MffEmail;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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

Route::get('/tesroute', function () {
    $name = "Tes Hyo";

    // Log the name for debugging
    Log::info('Sending email to: ' . $name);

    try {
        // Send the email
        Mail::to('wildantaufik86@gmail.com')->send(new MffEmail($name));
        // Log after sending the email
        Log::info('Email sent to: ' . $name);
    } catch (\Exception $e) {
        // Log the error
        Log::error('Error sending email: ' . $e->getMessage());
    }
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [VisitorController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/create', [VisitorController::class, 'create'])->name('dashboard.create');
    Route::post('/dashboard/store', [VisitorController::class, 'store'])->name('dashboard.store');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/checkin', [AttendanceController::class, 'checkIn'])->name('check-in');
    Route::post('/checkout', [AttendanceController::class, 'checkOut'])->name('check-out');
});
Route::get('/attendance', function () {
    return Inertia::render('Attendance');
})->name('attendance');

// Route::get('/count', function () {
//     return Inertia::render('Count/index');
// })->name('count');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/count', [AttendanceController::class, 'count'])->name('count');
    // Route::post('/checkout', [AttendanceController::class, 'checkOut'])->name('check-out');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/count', [VisitorController::class, 'count'])->name('count');
})->name('count');

Route::get('/kursi', function () {
    return Inertia::render('Kursi/index');
})->middleware(['auth', 'verified'])->name('kursi');

Route::get('/checkin', function () {
    return Inertia::render('CheckIn/index');
})->middleware(['auth', 'verified'])->name('checkin');

Route::get('/checkout', function () {
    return Inertia::render('CheckOut/index');
})->middleware(['auth', 'verified'])->name('checkout');

Route::get('/registrasi', function () {
    return Inertia::render('Registrasi/index');
})->middleware(['auth', 'verified'])->name('registrasi');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::patch('/kursi/{id}', [VisitorController::class, 'update'])->name('kursi.update');
    Route::delete('/kursi/{id}', [VisitorController::class, 'destroy'])->name('kursi.destroy');
});
Route::middleware('auth')->group(function () {
    Route::get('/export-invitation', [VisitorController::class, 'exportInvitation'])->name('export.invitation');
    Route::get('/welcome', function () {
        return view('pdf.invitation');
    });
});
require __DIR__ . '/auth.php';
