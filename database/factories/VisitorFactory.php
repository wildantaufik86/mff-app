<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VisitorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'instansi' => fake()->state(),
            'email' => fake()->unique()->safeEmail(),
            'seat' => fake()->unique()->secondaryAddress(),
            'status' => fake()->boolean(),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ];
    }
}
