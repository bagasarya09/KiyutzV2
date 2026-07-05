<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Relasi ke categories. Kalau kategori dihapus, produk ikut terhapus.
            $table->foreignId('category_id')
                  ->constrained('categories')
                  ->cascadeOnDelete();

            $table->string('name');                   // Nama produk
            $table->text('description')->nullable();   // Deskripsi produk
            $table->decimal('price', 12, 2)->default(0); // Harga
            $table->string('image')->nullable();       // Path gambar

            // === Ketentuan wajib: kolom status aktif/inaktif ===
            $table->enum('status', ['aktif', 'inaktif'])->default('aktif');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};