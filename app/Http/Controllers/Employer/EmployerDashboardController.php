<?php

namespace App\Http\Controllers\Employer;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class EmployerDashboardController extends Controller
{
    public function profile()
    {
        return inertia('Employer/Profile');
    }
    public function index()
    {
        return inertia('Employer/Dashboard', [
            'role' => 'Employer'
        ]);
    }
}
