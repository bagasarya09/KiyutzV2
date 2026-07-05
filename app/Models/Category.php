<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'status'];

    // Satu kategori punya banyak produk
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    // Scope bantu: ambil yang aktif saja
    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }
}