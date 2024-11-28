<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $role = Auth::user()->role;

            if ($role === 0) {
                return redirect()->route('admin.dashboard');
            }else if($role === 1){
                return redirect()->route('employer.dashboard');
            }
        } else {
            return redirect()->route('login');
        }
    }
}
