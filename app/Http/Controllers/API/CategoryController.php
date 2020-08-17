<?php

namespace App\Http\Controllers\API;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::with('subCategories')->get();

        return response()->json([
            "categories" => $categories->toArray()
        ], 200);
    }
}
