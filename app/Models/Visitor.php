<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
  use HasFactory;
  protected $table = 'visitor';
  protected $primaryKey = 'id';
  protected $fillable = [
    'name',
    'instansi',
    'email',
    'status',
    'seat',
  ];

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
