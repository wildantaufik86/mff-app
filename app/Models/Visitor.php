<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
  use HasFactory;
  protected $table = 'visitors';
  protected $primaryKey = 'id';
  protected $fillable = [
    'name',
    'instansi',
    'email',
    'seat',
    'invitation',
    'barcode_id'
  ];

  protected static function boot()
  {
    parent::boot();

    static::deleting(function ($visitor) {
      if ($visitor->barcode) {
        $visitor->barcode->delete();
      }
    });
  }

  public function barcode()
  {
    return $this->belongsTo(barcode::class, 'barcode_id');
  }

  protected $hidden = [
    'remember_token'
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime'
  ];
}
