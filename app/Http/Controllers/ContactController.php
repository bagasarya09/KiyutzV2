<?php
namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $setting = Setting::first();
        $to = $setting?->recipient_email ?: config('mail.from.address');

        if (! $to) {
            return back()->with('error', 'Email tujuan belum diatur. Hubungi admin.');
        }

        try {
            Mail::to($to)->send(new ContactMessageMail($data['name'], $data['email'], $data['message']));
        } catch (\Throwable $e) {
            Log::error('Gagal kirim email kontak: ' . $e->getMessage());
            return back()->with('error', 'Pesan gagal dikirim. Coba beberapa saat lagi.');
        }

        return back()->with('success', 'Pesan berhasil dikirim! Kami akan segera membalas.');
    }
}