<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    /**
     * Display a view of the resource.
     */
    public function index()
    {
        return inertia('Admin/User/Index');
    }

    /**
     * Display a listing of the resource.
     */
    public function getData()
    {
        return User::whereNot('id', Auth::user()->id)->get();
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        User::create($data);

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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        User::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
