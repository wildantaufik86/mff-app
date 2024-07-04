<?php

namespace Database\Factories;

use App\Models\barcode;
use App\Models\Visitor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Barcode>
 */
class BarcodeFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  protected $model = barcode::class;
  public function definition(): array
  {
    return [
      'code' => $this->faker->uuid,
      'visitor_id' => function () {
        return Visitor::factory()->create()->id;
      },
    ];
  }
}
