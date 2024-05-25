<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field", 'errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => "Email or password incorrect"], 401);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message'=> 'Login success', 'user' => [
            "name" => $user->name,
            "email" => $user->email,
            "accessToken" => $token
        ]]);
    }


    public function logout(){
        $user = Auth::user()->currentAccessToken()->delete();

        return response()->json(["message" => "Logout success"]);
    }
}
