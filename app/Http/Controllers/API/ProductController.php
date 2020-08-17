<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $product = Product::with('brand', "images", "subCategory", "subCategory.category")->get();

        return response()->json([
            "products" => $product->toArray()
        ], 200);
    }
}
