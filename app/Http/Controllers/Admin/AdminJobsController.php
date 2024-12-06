<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobList;
use Illuminate\Http\Request;

class AdminJobsController extends Controller
{
    public function index()
    {
        return inertia('Admin/Jobs/Index');
    }

    public function getData(Request $request)
    {
        return JobList::where('status', 0)
                    ->Where('job_title', 'like', "{$request->search}%")
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);
    }

    public function approved($id)
    {
        JobList::where('id', $id)->update(['status' => '1']);

        return response()->json([
            'status' => 'approved'
        ],200);
    }
}
