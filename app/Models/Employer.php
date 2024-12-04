<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    protected $table = 'employers';

    protected $fillable = [
        'user_id',
        'company_name',
        'contact',
        'website',
        'address',
        'industry',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function jobPostings()
    {
        return $this->hasMany(JobList::class, 'employer_id');
    }

}