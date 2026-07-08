<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PragmaRX\Google2FAQRCode\Google2FA;

class TwoFactorLoginController extends Controller
{
    public function create(Request $request)
    {
        if (! $request->session()->has('login.2fa_user_id')) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/TwoFactorChallenge');
    }

    public function store(Request $request)
    {
        $request->validate(['code' => ['required', 'string']]);

        $userId = $request->session()->get('login.2fa_user_id');
        if (! $userId) {
            return redirect()->route('login');
        }

        $user = User::findOrFail($userId);

        if (! (new Google2FA())->verifyKey($user->two_factor_secret, $request->code)) {
            return back()->withErrors(['code' => 'Kode tidak valid.']);
        }

        $remember = $request->session()->pull('login.remember', false);
        $request->session()->forget('login.2fa_user_id');

        Auth::login($user, $remember);
        $request->session()->regenerate();

        return redirect()->intended('/admin/dashboard');
    }
}