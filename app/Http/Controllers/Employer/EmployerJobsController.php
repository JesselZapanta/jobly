<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employer\StoreJobRequest;
use App\Http\Requests\Employer\UpdateJobRequest;
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
        $employer = Auth::user()->employer; 

        if (!$employer) {
            return response()->json(['error' => 'Employer not found'], 404); 
        }
        //add the filter
        return JobList::where('employer_id', $employer->id)
                        ->where('job_title' ,'like' , "{$request->search}%")
                        ->orderBy($request->sortField, $request->sortOrder)
                        ->paginate(10);
    }

    /**
     * For image /file uploads [antd]
     */

    public function tempUpload(Request $request){
        
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

        $employer = Auth::user()->employer;

        if (!$employer) {
            // redirect to profile page
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
    public function update(UpdateJobRequest $request, string $id)
    {   
        $data = $request->validated();
        $job = JobList::findOrFail($id);

        $data['languages'] = implode('|',  $data['languages'] );
        $data['skills'] = implode('|', $data['skills']);
        $data['benefits'] = implode('|', $data['benefits']);

        $job->update($data);

        return response()->json([
            'status' => 'updated'
        ], 200);
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
