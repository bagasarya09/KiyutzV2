<?php
namespace App\Http\Controllers;
use App\Models\Setting;
use App\Models\Social;
use App\Models\Category;
use App\Models\Product;
use App\Models\About;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('Landing', [   
            'products' => Product::with('category')
                ->where('status', 'aktif')   
                ->latest()
                ->get(),
            'categories' => Category::where('status', 'aktif')
                ->orderBy('name')
                ->get(['id', 'name']),
            'about' => About::first(),
            'setting' => Setting::first(),
            'socials' => Social::where('status', 'aktif')->orderBy('sort_order')->get(),
        ]);
    }
}