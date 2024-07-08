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
        'name', 'instansi', 'email', 'seat', 'status', 'tanggal',
        'barcode_image_path', 'barcode_code', 'invitation', 'gate', 'remember_token', 'check_in_time', 'check_out_time',
    ];

    public function visitorGroup()
    {
        return $this->hasOne(VisitorGroup::class);
    }

    public function seat()
    {
        return $this->hasOne(Seat::class);
    }


    protected $dates = [
        'check_in_time',
        'check_out_time',
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
        'email_verified_at' => 'datetime',
    ];
}
