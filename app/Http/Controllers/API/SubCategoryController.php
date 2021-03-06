<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\SubCategory;

class SubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $sub_categories = SubCategory::with('category', 'brands')->get();

        return response()->json([
            "sub_categories" => $sub_categories->toArray()
        ], 200);
    }
}
