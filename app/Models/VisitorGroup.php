<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorGroup extends Model
{
    protected $fillable = ['visitor_id', 'group_person'];

    protected $casts = [
        'group_person' => 'array',
    ];

    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }
}
