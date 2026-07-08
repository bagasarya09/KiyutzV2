<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PragmaRX\Google2FAQRCode\Google2FA;

class TwoFactorController extends Controller
{
    protected Google2FA $google2fa;

    public function __construct()
    {
        $this->google2fa = new Google2FA();
    }

    // Halaman pengaturan
    public function show(Request $request)
    {
        $user = $request->user();
        $qrCode = null;
        $secret = null;

        // Ada secret tapi belum dikonfirmasi → tampilkan QR untuk di-scan
        if ($user->two_factor_secret && ! $user->two_factor_confirmed_at) {
            $secret = $user->two_factor_secret;
            $qrCode = $this->google2fa->getQRCodeInline(
                config('app.name', 'Kiyutz'),
                $user->email,
                $secret
            );
        }

        return Inertia::render('Admin/Security/TwoFactor', [
            'enabled' => (bool) $user->two_factor_confirmed_at,
            'qrCode'  => $qrCode,
            'secret'  => $secret,
        ]);
    }

    // Mulai aktivasi: buat secret baru (belum aktif sampai dikonfirmasi)
    public function enable(Request $request)
    {
        $request->user()->forceFill([
            'two_factor_secret'       => $this->google2fa->generateSecretKey(),
            'two_factor_confirmed_at' => null,
        ])->save();

        return back();
    }

    // Konfirmasi kode dari aplikasi authenticator
    public function confirm(Request $request)
    {
        $request->validate(['code' => ['required', 'string']]);
        $user = $request->user();

        if (! $this->google2fa->verifyKey($user->two_factor_secret, $request->code)) {
            return back()->withErrors(['code' => 'Kode salah. Coba lagi.']);
        }

        $user->forceFill(['two_factor_confirmed_at' => now()])->save();

        return back()->with('status', '2FA berhasil diaktifkan.');
    }

    // Nonaktifkan 2FA
    public function disable(Request $request)
    {
        $request->user()->forceFill([
            'two_factor_secret'       => null,
            'two_factor_confirmed_at' => null,
        ])->save();

        return back()->with('status', '2FA dinonaktifkan.');
    }
}