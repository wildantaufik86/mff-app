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
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('seat')->nullable()->default('');
            $table->string('gate')->nullable()->default('');
            $table->string('status')->default('Not Assigned');
            $table->string('tanggal')->nullable()->default('');
            $table->string('barcode_image_path')->nullable()->default('');
            $table->string('barcode_code')->default('send invitation');
            $table->string('invitation')->default('send invitation');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitors');
    }
};
