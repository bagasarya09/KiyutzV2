<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProduct'    => Product::count(),
                'activeProduct'   => Product::where('status', 'aktif')->count(),
                'inactiveProduct' => Product::where('status', 'inaktif')->count(),
                'totalCategory'   => Category::count(),
            ],
            'recentProducts' => Product::with('category')
                ->latest()
                ->take(5)
                ->get(['id', 'name', 'price', 'image', 'status', 'category_id', 'created_at']),
        ]);
    }
}