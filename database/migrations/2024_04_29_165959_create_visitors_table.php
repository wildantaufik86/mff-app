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
      $table->string('instansi');
      $table->string('email');
      $table->string('seat');
      $table->foreignId('barcode_id')->nullable();
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
