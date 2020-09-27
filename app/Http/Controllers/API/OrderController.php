<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;

class OrderController extends Controller
{
    
    public function index(Request $request)
    {
        $orders = Order::with('subCategories', "subCategories.category")->get();

        return response()->json([
            "orders" => $orders->toArray()
        ], 200);
    }
    
    public function create(Request $request)
    {
        $orders = Order::with('subCategories', "subCategories.category")->get();

        return response()->json([
            "orders" => $orders->toArray()
        ], 200);
    }
    
    public function update(Request $request)
    {
        $orders = Order::with('subCategories', "subCategories.category")->get();

        return response()->json([
            "orders" => $orders->toArray()
        ], 200);
    }
    
    public function cancel(Request $request)
    {
        $orders = Order::with('subCategories', "subCategories.category")->get();

        return response()->json([
            "orders" => $orders->toArray()
        ], 200);
    }
    
    public function delete(Request $request)
    {
        $orders = Order::with('subCategories', "subCategories.category")->get();

        return response()->json([
            "orders" => $orders->toArray()
        ], 200);
    }

}
