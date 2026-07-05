<?php
namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $items = ['Makanan', 'Minuman', 'Fashion', 'Elektronik', 'Lainnya'];

        foreach ($items as $name) {
            Category::create([
                'name'   => $name,
                'slug'   => Str::slug($name),
                'status' => 'aktif',
            ]);
        }
    }
}