<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class barcode extends Model
{
    use HasFactory;
    protected $table = 'barcodes';
    protected $fillable = ['code', 'visitor_id'];

    public function visitor()
    {
        return $this->belongsTo(Visitor::class, 'barcode_id');
    }
    public static function generateUniqueCode()
    {
        do {
            $code = Str::random(10);
        } while (static::where('code', $code)->exists());

        return $code;
    }
}
