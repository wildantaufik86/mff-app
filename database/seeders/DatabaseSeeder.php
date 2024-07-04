<?php

namespace Database\Seeders;

use Illuminate\Support\Str;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    \App\Models\User::factory()->create([
      'name' => 'admin',
      'email' => 'admin@email.com',
      'password' => 'admin'
    ]);
    \App\Models\User::factory()->create([
      'name' => 'admin2',
      'email' => 'admin2@email.com',
      'password' => 'admin2'
    ]);
  }
}
