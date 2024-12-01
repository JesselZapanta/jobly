<?php

namespace App\Http\Controllers\Employer;
use App\Http\Controllers\Controller;

use App\Http\Requests\Employer\EmployerStoreProfileRequest;
use App\Models\Employer;
use Auth;
use Illuminate\Http\Request;

class EmployerDashboardController extends Controller
{
    public function index()
    {
        return inertia('Employer/Dashboard', [
            'role' => 'Employer'
        ]);
    }

    public function profile()
    {
        return inertia('Employer/Profile');
    }

    public function store (EmployerStoreProfileRequest $request)
    {   
        $user_id = Auth::user()->id;
        
        $data = $request->validated();

        $data['user_id'] = $user_id;
        
        Employer::create($data);
        
        return response()->json([
            'status' => 'created'
        ], 200);
    }
}
