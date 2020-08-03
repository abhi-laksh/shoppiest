<?php

namespace App\Http\Controllers\API\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use App\Product;

class AdminProductController extends Controller
{
    public function index(Request $request)
    {
        $product = Product::with('brands', "images", "subCategory", "subCategory.category")->get();

        return response()->json([
            "products" => $product->toArray()
        ], 200);
    }

    public function create(Request $request)
    {

        $this->validate($request, [
            "code" => "required",
            "name" => "required|max:255",
            "short_description" => "required",
            "description" => "required|max:255",
            "selling_price" => "required",
            "cost_price" => "required",
            "stock" => "required",
            "primary_img" => "required|image|mimes:jpeg,png,jpg",
            // in front end -> secondary_imgs[]
            "secondary_imgs" => "nullable",

            "image_title" => "nullable|regex:/[a-zA-Z0-9&\-\/(),.\|$%:;'\" @+={}\[\]]+/gm|max:255",
            "image_alt" => "nullable|regex:/[a-zA-Z0-9&\-\/(),.\|$%:;'\" @+={}\[\]]+/gm|max:255",

            "sub_category_id" => "required",
            "brand_id" => "required",
        ]);

        //defaults
        $destination = public_path('images') . "/";
        $file_name = ($request->name);
        $primary_img = $request->file('primary_img');

        // max 2MB in bytes
        if ($primary_img->getSize() > 2097152) {
            return response()->json([
                "error" => "Max file size in 2MB",
            ], 402);
        }

        $product = new Product();

        $product->code = $request->code;
        $product->name = $request->name;
        $product->short_description = $request->short_description;
        $product->description = $request->description;
        $product->selling_price = $request->selling_price;
        $product->cost_price = $request->cost_price;
        $product->stock = $request->stock;

        // image details;

        //primary img

        $primary_ext = "." . $primary_img->getClientOriginalExtension();
        // if($primary_img->getClientSize() > 2048){}

        $image = new Image();

        $image->mime_type = $primary_img->getClientMimeType();
        $image->title = $request->image_title ? $request->image_title : $request->name;
        $image->alt = $request->image_alt ? $request->image_alt : $request->name;
        $image->src = ($file_name . $primary_ext);


        $primary_img->move(public_path('images'), ($file_name . $primary_ext));


        return response()->json([
            "image" => $image,
        ], 200);
    }

    public function getNewCode(Request $request)
    {
        $code = $this->generateCode();
        return response()->json([
            "product_code" => $code
        ], 200);
    }

    protected function generateCode()
    {
        $data = Product::select('id', 'code')->orderBy('id', 'desc')->first();

        if (!empty($data['code'])) {

            $str = $data['code'];

            $matches = array();

            /* 
                ? Match 101, 010, 1001, etc in UID, (only from the end.)
                e.g :- magic(BHR00100) => 100
            */

            preg_match('/[0-9]{5}$/', $str, $matches);

            $num = str_pad(($matches[0] + 1), 7, '0', STR_PAD_LEFT);

            $code = "SHPSTPR" . $num;
        } else {
            $code = "SHPSTPR0000001";
        }

        return $code;
    }
}
