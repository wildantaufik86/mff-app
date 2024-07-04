<?php

namespace Database\Factories;

use App\Models\Visitor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VisitorFactory extends Factory
{
  protected $model = Visitor::class;
  public function definition(): array
  {
    return [
      'name' => fake()->name(),
      'instansi' => fake()->state(),
      'email' => fake()->randomNumber(),
      'seat' => fake()->secondaryAddress(),
      'invitation' => fake()->boolean(),
      'remember_token' => Str::random(10)
    ];
  }
  // public function configure()
  // {
  //   return $this->afterCreating(function (Visitor $visitor) {
  //     // Create Barcode for the created Visitor
  //     $visitor->barcodes()->save(\App\Models\barcode::factory()->make());
  //   });
  // }
}
