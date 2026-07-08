<?php
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SocialController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TwoFactorController;         
use App\Http\Controllers\Auth\TwoFactorLoginController;     
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| ROUTE PUBLIK (tanpa login)
|--------------------------------------------------------------------------
*/
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/produk/{id}', [LandingController::class, 'show'])->name('produk.show');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/sitemap.xml', function () {
    $products = \App\Models\Product::where('status', 'aktif')->get();

    return response()
        ->view('sitemap', ['products' => $products])
        ->header('Content-Type', 'text/xml');
});

// Registrasi ditutup → arahkan ke login
Route::get('/register', fn () => redirect('/login'));

/*
|--------------------------------------------------------------------------
| TANTANGAN 2FA SAAT LOGIN (hanya untuk guest / belum login penuh)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('two-factor-challenge', [TwoFactorLoginController::class, 'create'])
        ->name('two-factor.login');
    Route::post('two-factor-challenge', [TwoFactorLoginController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| ROUTE ADMIN (wajib login + role admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // About (profil toko)
        Route::get('/about', [AboutController::class, 'edit'])->name('about.edit');
        Route::put('/about', [AboutController::class, 'update'])->name('about.update');

        // CRUD
        Route::resource('categories', CategoryController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('products', ProductController::class)
            ->only(['index', 'store', 'update', 'destroy']);

        // Keamanan — pengaturan 2FA
        Route::get('/security/two-factor', [TwoFactorController::class, 'show'])
            ->name('two-factor.show');
        Route::post('/security/two-factor/enable', [TwoFactorController::class, 'enable'])
            ->name('two-factor.enable');
        Route::post('/security/two-factor/confirm', [TwoFactorController::class, 'confirm'])
            ->name('two-factor.confirm');
        Route::delete('/security/two-factor', [TwoFactorController::class, 'disable'])
            ->name('two-factor.disable');

        // Settings
        Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');

        // Social Media
        Route::post('/socials', [SocialController::class, 'store'])->name('socials.store');
        Route::put('/socials/{social}', [SocialController::class, 'update'])->name('socials.update');
        Route::delete('/socials/{social}', [SocialController::class, 'destroy'])->name('socials.destroy');

        // Profil
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

require __DIR__ . '/auth.php';