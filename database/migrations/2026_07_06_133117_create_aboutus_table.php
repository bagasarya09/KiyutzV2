<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('Tentang Kiyutz');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->text('quote')->nullable()->after('description');
            $table->string('founder')->nullable()->after('quote');
            $table->text('vision')->nullable();   // visi
            $table->text('mission')->nullable();  // misi
            $table->string('image')->nullable();
            $table->string('image2')->nullable()->after('image'); // foto kecil
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('abouts', function (Blueprint $table) {
            $table->dropColumn(['quote', 'founder', 'image2']);
        });
    }
};