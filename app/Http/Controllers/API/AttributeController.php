<?php

namespace App\Http\Controllers\API;

use App\Attribute;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AttributeController extends Controller
{
    public function index(Request $request)
    {

        $attributes= Attribute::with('values')->get();
        
        return response()->json([
            "attributes" => $attributes->toArray()
        ], 200);
    }
}
