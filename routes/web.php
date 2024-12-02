<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Employer\EmployerDashboardController;
use App\Http\Controllers\Employer\EmployerJobsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function() {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/user', [AdminUserController::class, 'index'])->name('admin.user');
    Route::post('/admin/user/store', [AdminUserController::class, 'store']);
    Route::get('/admin/user/getData', [AdminUserController::class, 'getData']);
    Route::put('/admin/user/update/{id}', [AdminUserController::class, 'update']);
    Route::delete('/admin/user/delete/{id}', [AdminUserController::class, 'destroy']);

    Route::post('/avatar-temp-upload', [AdminUserController::class, 'tempUpload']);
    Route::post('/avatar-temp-remove/{filename}', [AdminUserController::class, 'removeUpload']);
    Route::post('/avatar-image-replace/{id}/{filename}', [AdminUserController::class, 'replaceUpload']);
});

Route::middleware(['auth', 'employer', 'profile-check'])->group(function(){
    Route::get('/employer/make-profile', [EmployerDashboardController::class, 'profile'])->name('employer.profile');
    Route::post('/employer/make-profile/store', [EmployerDashboardController::class, 'store']);
    Route::get('/employer/dashboard', [EmployerDashboardController::class, 'index'])->name('employer.dashboard');

    Route::get('/employer/job/index', [EmployerJobsController::class, 'index'])->name('employer.job.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
