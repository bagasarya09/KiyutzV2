<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutRequest;
use App\Models\About;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function edit()
    {
        // ambil data yang ada, atau buat default kalau belum ada
        $about = About::firstOrCreate([], ['title' => 'Tentang Kiyutz']);

        return Inertia::render('Admin/About/Index', compact('about'));
    }

    public function update(AboutRequest $request)
    {
        $about = About::firstOrCreate([]);
        $data = $request->validated();

        // Foto besar
        if ($request->hasFile('image')) {
            if ($about->image) Storage::disk('public')->delete($about->image);
            $data['image'] = $request->file('image')->store('about', 'public');
        } else {
            unset($data['image']);
        }

        // Foto kecil
        if ($request->hasFile('image2')) {
            if ($about->image2) Storage::disk('public')->delete($about->image2);
            $data['image2'] = $request->file('image2')->store('about', 'public');
        } else {
            unset($data['image2']);
        }

        $about->update($data);

        return back()->with('success', 'Profil toko berhasil diperbarui.');
    }
}