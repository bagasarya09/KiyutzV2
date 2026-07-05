<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('Landing', [   // ⬅️ sesuaikan nama file page landing-mu
            'products' => Product::with('category')
                ->where('status', 'aktif')     // hanya produk aktif yang tampil
                ->latest()
                ->get(),
            'categories' => Category::where('status', 'aktif')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }
}