<?php

namespace App\Http\Controllers\Employer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employer\StoreJobRequest;
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
    public function store(Request $request)
    {
        // $data = $request->validated();

        $employer = Auth::user()->employer; // This can be null if no employer is associated

        if (!$employer) {
            return response()->json(['error' => 'Employer not found'], 404); 
        }

        return $employer->id;

        // return response()->json([
        //     'status' => 'created'
        // ], 200);
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
        
    }
}
