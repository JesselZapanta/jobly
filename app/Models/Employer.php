<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    protected $table = 'employers';

    protected $fillable = [
        'user_id',
        'company_name',
        'phone',
        'website',
        'address',
        'industry',
        'description',
    ];

    public function employer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}