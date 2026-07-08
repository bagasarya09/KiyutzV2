<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('contact_email')->nullable();    // email yang DITAMPILKAN
            $table->string('contact_phone')->nullable();
            $table->string('contact_address')->nullable();
            $table->text('operational_hours')->nullable();
            $table->string('recipient_email')->nullable();   // 👈 TUJUAN pesan masuk
            $table->text('brand_description')->nullable();    // teks footer
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
