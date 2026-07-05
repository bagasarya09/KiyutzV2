<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::with('category')->where('status', 'aktif')->latest()->get(),
            'categories' => Category::aktif()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();

       if ($request->hasFile('image')) {
            $manager = new ImageManager(new Driver());
            $img = $manager->read($request->file('image'));

            // resize maksimal lebar 800px (jaga rasio), lalu encode WebP
            $img->scaleDown(width: 800);
            $filename = 'products/' . uniqid() . '.webp';

            \Storage::disk('public')->put($filename, (string) $img->toWebp(75)); // kualitas 75

            $data['image'] = $filename;
        }

        Product::create($data);

        return back()->with('success', 'Produk berhasil ditambahkan.');
    }

    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            unset($data['image']); // jangan timpa gambar lama dengan null
        }

        $product->update($data);

        return back()->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return back()->with('success', 'Produk berhasil dihapus.');
    }
}