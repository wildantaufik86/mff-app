<?php

namespace Database\Factories;

use App\Models\Visitor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Milon\Barcode\DNS1D;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VisitorFactory extends Factory
{
    protected $model = Visitor::class;
    public function definition()
    {
        $number = mt_rand(8000000000, 9999999999);
        $barcodeFilePath = $this->generateBarcode($number);

        return [
            'name' => $this->faker->name,
            'instansi' => $this->faker->company,
            'email' => $this->faker->unique()->safeEmail,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'seat' => $this->faker->bothify('?##'),
            'barcode_code' => $barcodeFilePath,
        ];
    }

    private function generateBarcode($number)
    {
        $barcode = new DNS1D();
        $barcode->setStorPath(storage_path('app/public/barcodes/'));

        $barcodeData = $barcode->getBarcodePNG($number, 'C39', 1, 40);
        $fileName = $number . '.png';
        $filePath = 'public/barcodes/' . $fileName;
        Storage::put($filePath, $barcodeData);

        return $filePath;
    }
}
