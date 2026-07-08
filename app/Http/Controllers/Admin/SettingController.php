<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\Social;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/Settings/Index', [
            'setting' => Setting::firstOrCreate([]),
            'socials' => Social::orderBy('sort_order')->get(),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'contact_email'     => ['nullable', 'email', 'max:255'],
            'contact_phone'     => ['nullable', 'string', 'max:50'],
            'contact_address'   => ['nullable', 'string', 'max:500'],
            'operational_hours' => ['nullable', 'string', 'max:500'],
            'recipient_email'   => ['nullable', 'email', 'max:255'],
            'brand_description' => ['nullable', 'string', 'max:1000'],
        ]);

        Setting::firstOrCreate([])->update($data);

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}