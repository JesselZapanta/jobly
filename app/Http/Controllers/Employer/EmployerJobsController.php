<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployerJobsController extends Controller
{
    public function index()
    {
        return inertia('Employer/Jobs/Index');
    }
}
