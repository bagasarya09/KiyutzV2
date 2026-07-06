<?php
namespace App\Http\Controllers;

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
        ]);
    }
}