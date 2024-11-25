<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Storage;

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
    public function getData(Request $request)
    {
        // return $request->sortOrder;
        return User::where('name', 'like', "{$request->search}%")
                    ->orwhere('email', 'like', "{$request->search}%")
                    ->whereNot('id', Auth::user()->id)
                    ->orderBy($request->sortField, $request->sortOrder)
                    ->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function tempUpload(Request $req){
        $req->validate([
            'avatar' => ['mimes:jpg,jpeg,png']
        ]);
        
        $file = $req->avatar;
        $fileGenerated = md5($file->getClientOriginalName() . time());
        $imageName = $fileGenerated . '.' . $file->getClientOriginalExtension();
        $imagePath = $file->storeAs('temp', $imageName, 'public');
        $name = explode('/', $imagePath);
        return $name[1];
    }

    public function removeUpload($fileName){

        // return $fileName;
        if (Storage::disk('public')->exists('temp/' . $fileName)) {
            Storage::disk('public')->delete('temp/' . $fileName);

            return response()->json([
                'status' => 'remove'
            ], 200);
        }
    }

    public function replaceUpload($id, $fileName){
        $data = User::find($id);
        $oldAvatar = $data->avatar;

        // return $oldAvatar;
        $data->avatar = null;
        $data->save();

        if (Storage::disk('public')->exists('avatars/' . $oldAvatar)) {
            Storage::disk('public')->delete('avatars/' . $oldAvatar);

            if (Storage::disk('public')->exists('temp/' . $fileName)) {
                Storage::disk('public')->delete('temp/' . $fileName);
            }

            return response()->json([
                'status' => 'replace'
            ], 200);
        }

        return response()->json([
            'status' => 'error'
        ], 200);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $imgFilename = $request->avatar[0]['response'];
        $data['avatar'] = $imgFilename;

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        if (Storage::disk('public')->exists('temp/' . $imgFilename)) {
            // Move the file
            Storage::disk('public')->move('temp/' . $imgFilename, 'avatars/' . $imgFilename); 
            Storage::disk('public')->delete('temp/' . $imgFilename);
        }


        
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
    public function update(UpdateUserRequest $request, string $id)
    {   
        
        $data = $request->validated();

        $user = User::findOrFail($id);

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $imgFilename = $request->avatar[0]['response'];
        $data['avatar'] = $imgFilename;

        $user->update($data);

        if (Storage::disk('public')->exists('temp/' . $imgFilename)) {
            // Move the file
            Storage::disk('public')->move('temp/' . $imgFilename, 'avatars/' . $imgFilename); 
            Storage::disk('public')->delete('temp/' . $imgFilename);
        }


        return response()->json([
            'status' => 'updated'
        ], 200);
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
