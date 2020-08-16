<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|exists:users,email",
            "password" => "required",
        ]);

        $email = $request->email;
        $password = $request->password;

        $resp = array();
        

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user = Auth::user();

            $userRole = $user->role()->first();

            $token = $user->createToken($email,[$userRole->name]);

            

        }
    }
}
