<?php

namespace App\Http\Controllers\API\Admin;

use App\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use App\Product;
use App\SubCategory;
use Illuminate\Support\Facades\File;

class AdminProductController extends Controller 
{

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

        // get the brand 
        $brand = Brand::find($request->brand_id);

        if ($brand === null) {
            return response()->json([
                "error" => "brand not found.",
            ], 404);
        }

        // get the sub category 
        $sub_category = SubCategory::find($request->sub_category_id);

        if ($sub_category === null) {
            return response()->json([
                "error" => "sub category not found.",
            ], 404);
        }

        //defaults
        $file_name = ($request->name);
        $primary_img = $request->file('primary_img');

        $secondary_imgs = $request->file('secondary_imgs');

        if ((isset($secondary_imgs) && (sizeof($secondary_imgs) > 5))) {
            return response()->json([
                "error" => "Max 5 images are allowed for secondary images.",
            ], 402);
        }

        // max 2MB in bytes
        if ($primary_img->getSize() > 2097152) {
            return response()->json([
                "error" => "Max file size in 2MB",
            ], 402);
        }

        foreach ($secondary_imgs as $key => $value) {
            if ($value->getSize() > 2097152) {
                return response()->json([
                    "error" => "Max file size in 2MB",
                ], 402);
            }
        }

        $product = new Product();

        $product->code = $request->code;
        $product->name = $file_name;
        $product->short_description = $request->short_description;
        $product->description = $request->description;
        $product->selling_price = $request->selling_price;
        $product->cost_price = $request->cost_price;
        $product->stock = $request->stock;

        $product->brand()->associate($brand);

        $product->subCategory()->associate($sub_category);

        $product->save();

        // image details;

        //primary img

        $primary_ext = "." . $primary_img->getClientOriginalExtension();

        $primary_img->move(public_path('images'), ($file_name . $primary_ext));

        $image = new Image();

        $image->mime_type = $primary_img->getClientMimeType();
        $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
        $image->src = ($file_name . $primary_ext);
        $image->is_primary = 1;

        $image->imageable_id = $product->id;
        $image->imageable_type = get_class($product);

        $product->images()->save($image);

        foreach ($secondary_imgs as $key => $value) {

            $ext = "." . $value->getClientOriginalExtension();

            $value->move(public_path('images'), ($file_name . $key . $ext));

            $image = new Image();

            $image->mime_type = $value->getClientMimeType();
            $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
            $image->src = ($file_name . $key . $ext);

            $image->imageable_id = $product->id;
            $image->imageable_type = get_class($product);

            $product->images()->save($image);
        }

        return response()->json([
            "success" =>  "Successfully created new product",
        ], 200);
    }

    public function update(Request $request, $id)
    {

        $this->validate($request, [
            "code" => "required",
            "name" => "required|max:255",
            "short_description" => "required",
            "description" => "required|max:255",
            "selling_price" => "required",
            "cost_price" => "required",
            "stock" => "required",
            "primary_img" => "nullable|image|mimes:jpeg,png,jpg",
            // in front end -> secondary_imgs[]
            "secondary_imgs" => "nullable",

            "image_title" => "nullable|regex:/[a-zA-Z0-9&\-\/(),.\|$%:;'\" @+={}\[\]]+/gm|max:255",
            "image_alt" => "nullable|regex:/[a-zA-Z0-9&\-\/(),.\|$%:;'\" @+={}\[\]]+/gm|max:255",

            "sub_category_id" => "required",
            "brand_id" => "required",
        ]);

        // get the brand 
        $brand = Brand::find($request->brand_id);

        if ($brand === null) {
            return response()->json([
                "error" => "brand not found.",
            ], 404);
        }

        // get the sub category 
        $sub_category = SubCategory::find($request->sub_category_id);

        if ($sub_category === null) {
            return response()->json([
                "error" => "sub category not found.",
            ], 404);
        }

        //defaults
        $file_name = ($request->name);

        $primary_img = $request->file('primary_img');
        $secondary_imgs = $request->file('secondary_imgs');

        $product = Product::find($id);

        if ($product === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        if (
            (($product->images()->where('is_primary', 1)->first()) === null)
            && !(isset($primary_img))
        ) {
            return response()->json([
                "error" => "primary image is important!"
            ], 400);
        }

        $product->code = $request->code;
        $product->name = $file_name;
        $product->short_description = $request->short_description;
        $product->description = $request->description;
        $product->selling_price = $request->selling_price;
        $product->cost_price = $request->cost_price;
        $product->stock = $request->stock;

        // attach brand and sub category
        $product->brand()->associate($brand);

        $product->subCategory()->associate($sub_category);

        $product->save();

        // handles image logic

        if ((!isset($primary_img) && !isset($secondary_imgs))) {
            return response()->json([
                "success" => "product updated successfully."
            ], 200);
        } else {
            // both
            if ((isset($primary_img) && isset($secondary_imgs))) {
                // max 2MB in bytes
                if (($primary_img->getSize() > 2097152)) {
                    return response()->json([
                        "error" => "Max file size in 2MB",
                    ], 400);
                }

                if ((sizeof($secondary_imgs) > 5)) {
                    return response()->json([
                        "error" => "Max 5 images are allowed for secondary images.",
                    ], 400);
                }

                foreach ($secondary_imgs as $key => $value) {
                    if ($value->getSize() > 2097152) {
                        return response()->json([
                            "error" => "Max file size in 2MB",
                        ], 402);
                    }
                }

                // image details;

                //primary img

                $primary_ext = "." . $primary_img->getClientOriginalExtension();

                $primary_img->move(public_path('images'), ($file_name . $primary_ext));

                $image = new Image();

                $image->mime_type = $primary_img->getClientMimeType();
                $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
                $image->src = ($file_name . $primary_ext);
                $image->is_primary = 1;

                $image->imageable_id = $id;
                $image->imageable_type = get_class($product);

                $product->images()->save($image);

                foreach ($secondary_imgs as $key => $value) {

                    $ext = "." . $value->getClientOriginalExtension();

                    $value->move(public_path('images'), ($file_name . $key . $ext));

                    $image = new Image();

                    $image->mime_type = $value->getClientMimeType();
                    $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
                    $image->src = ($file_name . $key . $ext);

                    $image->imageable_id = $id;
                    $image->imageable_type = get_class($product);

                    $product->images()->save($image);
                }

                return response()->json([
                    "success" =>  "Successfully updated product",
                ], 200);
            } elseif ((!isset($primary_img) && (isset($secondary_imgs)))) {
                // only secondary

                if ((sizeof($secondary_imgs) > 5)) {
                    return response()->json([
                        "error" => "Max 5 images are allowed for secondary images.",
                    ], 400);
                }

                foreach ($secondary_imgs as $key => $value) {

                    if ($value->getSize() > 2097152) {
                        return response()->json([
                            "error" => "Max file size in 2MB",
                        ], 400);
                    }

                    $ext = "." . $value->getClientOriginalExtension();

                    $value->move(public_path('images'), ($file_name . $key . $ext));

                    $image = new Image();

                    $image->mime_type = $value->getClientMimeType();
                    $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
                    $image->src = ($file_name . $key . $ext);

                    $image->imageable_id = $id;
                    $image->imageable_type = get_class($product);

                    $product->images()->save($image);
                }

                return response()->json([
                    "success" =>  "Successfully updated product",
                ], 200);
            } else {

                // max 2MB in bytes
                if (($primary_img->getSize() > 2097152)) {
                    return response()->json([
                        "error" => "Max file size in 2MB",
                    ], 400);
                }

                $primary_ext = "." . $primary_img->getClientOriginalExtension();

                $primary_img->move(public_path('images'), ($file_name . $primary_ext));

                $image = new Image();

                $image->mime_type = $primary_img->getClientMimeType();
                $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
                $image->src = ($file_name . $primary_ext);
                $image->is_primary = 1;

                $image->imageable_id = $id;
                $image->imageable_type = get_class($product);

                $product->images()->save($image);

                return response()->json([
                    "success" =>  "successfully updated product",
                ], 200);
            }
        }
    }

    public function removeAllImages(Request $request, $id)
    {
        $product = Product::find($id);

        if ($product === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        foreach ($product->images as $image) {
            if (File::exists(public_path('images/' . $image->src))) {
                File::delete(public_path('images/' . $image->src));
            }
        }

        $product->images()->delete();

        return response()->json([
            "success" => "image deleted successfully."
        ], 200);
    }

    public function removeImage(Request $request, $id, $image_id)
    {
        $product = Product::find($id);

        if ($product === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        $image = $product->images()->where('id', $image_id)->first();

        if ($image === null) {
            return response()->json([
                "error" => "image not found."
            ], 404);
        }

        if (File::exists(public_path('images/' . $image->src))) {
            File::delete(public_path('images/' . $image->src));
        }

        $image->delete();

        return response()->json([
            "success" => "image deleted successfully."
        ], 200);
    }

    
    public function delete(Request $request, $id)
    {
        $data = Product::find($id);

        if ($data === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        $data->delete();

        return response()->json([
            "success" => "product deleted successfully."
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

            preg_match('/[0-9]{5}$/', $str, $matches);

            $num = str_pad(($matches[0] + 1), 7, '0', STR_PAD_LEFT);

            $code = "SHPSTPR" . $num;
        } else {
            $code = "SHPSTPR0000001";
        }

        return $code;
    }
}
