<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employer\StoreJobRequest;
use App\Models\JobList;
use Auth;
use Illuminate\Http\Request;

class EmployerJobsController extends Controller
{
    /**
     * Display a view of the resource.
     */
    public function index()
    {
        return inertia('Employer/Jobs/Index');
    }

    /**
     * Display a listing of the resource.
     */
    public function getData(Request $request)
    {
        $employer = Auth::user()->employer; // This can be null if no employer is associated

        if (!$employer) {
            return response()->json(['error' => 'Employer not found'], 404); 
        }
        
        return JobList::where('employer_id', $employer->id)
                        ->where('job_title' ,'like' , "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    /**
     * For image /file uploads [antd]
     */

    public function tempUpload(Request $req){
        
    }

    public function removeUpload($fileName){

    }

    public function replaceUpload($id, $fileName){
        
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobRequest $request)
    {
        $data = $request->validated();

        $employer = Auth::user()->employer; // This can be null if no employer is associated

        if (!$employer) {
            return response()->json(['error' => 'Employer not found'], 404); 
        }

        $data['employer_id'] = $employer->id;

        $data['languages'] = implode('|', $data['languages']);
        $data['skills'] = implode('|', $data['skills']);
        $data['benefits'] = implode('|', $data['benefits']);

        JobList::create($data);

        return response()->json([
            'status' => 'created'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        JobList::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
