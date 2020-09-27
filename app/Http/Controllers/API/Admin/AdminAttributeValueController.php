<?php

namespace App\Http\Controllers\API\Admin;

use App\Attribute;
use App\AttributeValue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminAttributeValueController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            "attribute_id" => "required",
            "abbreviation" => "required|max:255",
            "value" => "required|max:255",
        ]);

        $attribute = Attribute::find($request->attribute_id);

        if ($attribute === null) {
            return response()->json([
                "error" => "attribute not found."
            ], 404);
        }

        $attributeValue  = new AttributeValue();
        $attributeValue->value = $request->value;
        $attributeValue->abbreviation = $request->abbreviation;

        $attribute->values()->save($attributeValue);

        return response()->json([
            "success" => "attribute value created successfully."
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "attribute_id" => "required",
            "abbreviation" => "required|max:255",
            "value" => "required|max:255",
        ]);

        $attribute = Attribute::find($request->attribute_id);

        if ($attribute === null) {
            return response()->json([
                "error" => "attribute not found."
            ], 404);
        }

        $attributeValue = AttributeValue::find($id);

        $attributeValue->value = $request->value;
        $attributeValue->abbreviation = $request->abbreviation;

        $attributeValue->attribute()->associate($attribute);
        $attributeValue->save();

        return response()->json([
            "success" => "attribute value updated successfully."
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        $attributeValue  = AttributeValue::find($id);

        if ($attributeValue === null) {
            return response()->json([
                "error" => "attribute value not found."
            ], 404);
        }
        
        $attributeValue->delete();

        return response()->json([
            "success" => "attribute value deleted successfully."
        ], 200);
    }
}
