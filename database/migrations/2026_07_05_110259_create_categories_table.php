<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');                  // Nama kategori
            $table->string('slug')->unique();        // Untuk URL / query
            $table->text('description')->nullable();  // Deskripsi opsional

            // === Ketentuan wajib: kolom status aktif/inaktif ===
            $table->enum('status', ['aktif', 'inaktif'])->default('aktif');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};