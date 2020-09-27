<?php

namespace App\Http\Controllers\API\Admin;

use App\Attribute;
use App\AttributeValue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Image;
use App\Product;
use App\Variant;
use Illuminate\Support\Facades\File;

class AdminVariantController extends Controller
{

    public function addImage(Request $request, $id)
    {
        $this->validate($request, [
            "primary_img" => "required|image|mimes:jpeg,png,jpg",
            // in front end input name-> secondary_imgs[]
            "secondary_imgs" => "nullable",
            "image_title" => "nullable|max:255",
            "image_alt" => "nullable|max:255",
        ]);

        $variant = Variant::find($id);

        if ($variant === null) {
            return response()->json([
                "error" => "variant not found."
            ], 404);
        }

        $primary_img = $request->file('primary_img');

        $secondary_imgs = $request->file('secondary_imgs');

        if ((isset($secondary_imgs) && (sizeof($secondary_imgs) > 5))) {
            return response()->json([
                "error" => "Max 5 images are allowed for secondary images.",
            ], 402);
        }

        if ($primary_img->getSize() > 2097152) {
            return response()->json([
                "error" => "Max file size in 2MB",
            ], 402);
        }

        if (isset($secondary_imgs)) {
            foreach ($secondary_imgs as $key => $value) {
                if ($value->getSize() > 2097152) {
                    return response()->json([
                        "error" => "Max file size in 2MB",
                    ], 402);
                }
            }
        }

        $file_name = ($variant->product->name);

        $primary_ext = "." . $primary_img->getClientOriginalExtension();

        $primary_img->move(public_path('images'), ($file_name . $primary_ext));

        $date =  (\DateTime::createFromFormat('U.u', microtime(true)))->format("Y-m-d-H-i-su");

        $image = new Image();

        $image->mime_type = $primary_img->getClientMimeType();
        $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
        $image->src = ($file_name . "-" . ($variant->product->code) . "-" . $date . $primary_ext);
        $image->is_primary = 1;

        $image->imageable_id = $id;
        $image->imageable_type = get_class($variant);

        $variant->images()->save($image);

        if (isset($secondary_imgs)) {
            foreach ($secondary_imgs as $value) {

                $ext = "." . $value->getClientOriginalExtension();

                $date =  (\DateTime::createFromFormat('U.u', microtime(true)))->format("Y-m-d-H-i-su");

                $value->move(public_path('images'), ($file_name . "-" . ($variant->product->code) . "-" . $date . $ext));

                $image = new Image();

                $image->mime_type = $value->getClientMimeType();
                $image->alt =  ($request->image_alt ? $request->image_alt : $file_name);
                $image->src = ($file_name . "-" . ($variant->product->code) . "-" . $date . $ext);

                $image->imageable_id = $id;
                $image->imageable_type = get_class($variant);

                $variant->images()->save($image);
            }
        }

        return response()->json([
            "success" => "Image added successfully",
        ], 200);
    }

    public function removeImage(Request $request, $id, $image_id)
    {

        $variant = Variant::find($id);

        if ($variant === null) {
            return response()->json([
                "error" => "variant not found."
            ], 404);
        }

        $image = $variant->images()->where('id', $image_id)->first();

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
            "success" => "image removed successfully",
        ], 200);
    }

    public function removeAllImages(Request $request, $id)
    {

        $variant = Variant::find($id);

        if ($variant === null) {
            return response()->json([
                "error" => "variant not found."
            ], 404);
        }

        foreach ($variant->images as $image) {
            if (File::exists(public_path('images/' . $image->src))) {
                File::delete(public_path('images/' . $image->src));
            }
            $image->delete();
        }

        return response()->json([
            "success" => "all images removed successfully",
        ], 200);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "stock" => "required|max:20",
            "cost_price" => "required|max:20",
            "selling_price" => "required|max:20",
            "product_id" => "required",
            //In Front End Type: Array of ids
            "attribute_value_ids" => "required",
        ]);

        $attributeValues = AttributeValue::find($request->attribute_value_ids);

        $product = Product::find($request->product_id);

        if ($product === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        $variant = new Variant();

        $variant->stock = $request->stock;
        $variant->cost_price = $request->cost_price;
        $variant->selling_price = $request->selling_price;

        $product->variants()->save($variant);

        $variant->attributeValues()->attach($attributeValues);

        return response()->json([
            // "success" => "attribute value created successfully.",
            "success" => (count($request->attribute_value_ids) > count($attributeValues)) ? ("only " . count($attributeValues) . " out of " . count($request->attribute_value_ids) . " is/are created succefully. some attribute values are missing") : "variant created successfully.",
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "stock" => "required|max:20",
            "cost_price" => "required|max:20",
            "selling_price" => "required|max:20",
            "product_id" => "required",
            //In Front End Type: Array of ids
            "attribute_value_ids" => "required",
            "deleted_attribute_value_ids" => "nullable",
        ]);


        $variant = Variant::find($id);

        foreach ($variant->attributeValues as $value) {
            
            return response()->json([
                "attributeValues" => ($value->attribute)
            ], 200);

        }

        if ($variant === null) {
            return response()->json([
                "error" => "variant not found."
            ], 404);
        }

        if (isset($request->deleted_attribute_value_ids)) {
            $attributeValues = AttributeValue::find(array_merge(($request->attribute_value_ids), ($request->deleted_attribute_value_ids)));
        } else {
            $attributeValues = AttributeValue::find($request->attribute_value_ids);
        }

        $product = Product::find($request->product_id);

        if ($product === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        $variant->stock = $request->stock;
        $variant->cost_price = $request->cost_price;
        $variant->selling_price = $request->selling_price;

        $variant->product()->associate($product);

        foreach ($attributeValues as $AV) {
            //? check if not exists AttributeValue id
            if (!($variant->attributeValues->contains($AV->id)) && in_array($AV->id, $request->attribute_value_ids, true)) {
                $variant->attributeValues()->attach($AV);
            } else {
                //detach if deleted array has items.
                if (in_array($AV->id, $request->deleted_attribute_value_ids, true)) {
                    $variant->attributeValues()->detach($AV);
                }
            }
        }

        $variant->save();

        return response()->json([
            "success" => "variant updated successfully."
        ], 200);
    }

    public function delete(Request $request, $product_id, $id)
    {
        $data = Variant::find($id);

        if ($data === null) {
            return response()->json([
                "error" => "variant not found."
            ], 404);
        }

        $product = Product::find($product_id);

        if ($product === null) {
            return response()->json([
                "error" => "product not found."
            ], 404);
        }

        if (count($product->variants) <= 1) {
            return response()->json([
                "error" => "Deletion restricted! Product cannot have 0 variants."
            ], 404);
        }

        $data->attributeValues()->detach();

        $data->product()->dissociate($product);

        $data->delete();

        return response()->json([
            "success" => "variant deleted successfully."
        ], 200);
    }
}
