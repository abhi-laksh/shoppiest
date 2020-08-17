<?php

namespace App\Http\Controllers\API\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with(
            'role',
            // "reviews",
            // "reviews.images",
            // "orders",
            // "addresses",
        )->get();

        return response()->json([
            "users" => $users->toArray()
        ], 200);
    }
}
