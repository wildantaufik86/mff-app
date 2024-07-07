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
        'name', 'instansi', 'email', 'seat', 'status', 'tanggal', 'venue',
        'barcode_image_path', 'barcode_code', 'invitation', 'jam_mulai',
        'jam_selesai', 'remember_token', 'check_in_time', 'check_out_time',
        'group_status'
    ];

    public function visitorGroup()
    {
        return $this->hasOne(VisitorGroup::class);
    }

    protected $dates = [
        'check_in_time',
        'check_out_time',
        'tanggal',
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
        'group_status' => 'boolean',  // Tambahkan ini
        'jam_mulai' => 'datetime:H:i',  // Ubah ini jika perlu
        'jam_selesai' => 'datetime:H:i',  // Ubah ini jika perlu
    ];
}
