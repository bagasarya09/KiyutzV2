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
    Schema::table('abouts', function (Blueprint $table) {
        $table->text('quote')->nullable()->after('description');
        $table->string('founder')->nullable()->after('quote');
        $table->string('image2')->nullable()->after('image');
    });
}

public function down(): void
{
    Schema::table('abouts', function (Blueprint $table) {
        $table->dropColumn(['quote', 'founder', 'image2']);
    });
}
};
