<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobList extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'job_title',
        'industry',
        'job_type',
        'description',
        'currency',
        'salary_min',
        'salary_max',
        'qualifications',
        'experience',
        'languages',
        'skills',
        'benefits',
        'location',
        'schedule',
        'vacancies',
        'status',
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employer_id');
    }
}
