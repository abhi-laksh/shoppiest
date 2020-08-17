<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
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

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user = Auth::user();

            $userRole = $user->role;

            

            if ($userRole) {
                $this->scope = $userRole->name;
            }

            // return response()->json([
            //     "user" => ($user->role->name),
            // ], 200);
            
            $token = $user->createToken($email."-".(now()), [$this->scope]);

            if ($token->token->save()) {
                return response()->json([
                    'user' => [
                        "token" => ($token->accessToken),
                        "expires_at" => ($token->token->expires_at->diffInSeconds(Carbon::now())) * 1000,
                        "name" => $user->name,
                        "role" => $userRole->name
                    ],
                    "success" => "You have succefully logged in"
                ], 200);
            } else {
                return response()->json([
                    "error" => "A problem occured, please try again."
                ], 200);
            }
        }else {
            return response()->json([
                "error" => "Authentication failed."
            ], 200);
        }
    }
}
