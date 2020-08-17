<?php

namespace App\Http\Controllers\API;

use App\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BrandController extends Controller
{

    public function index(Request $request)
    {
        $brands = Brand::with('subCategories', "subCategories.category")->get();

        return response()->json([
            "brands" => $brands->toArray()
        ], 200);
    }

}
