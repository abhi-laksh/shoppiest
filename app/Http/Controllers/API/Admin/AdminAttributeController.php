<?php

namespace App\Http\Controllers\API\Admin;

use App\Attribute;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminAttributeController extends Controller
{

    public function create(Request $request)
    {
        $this->validate($request, [
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $attribute  = new Attribute();

        $attribute->name = $request->name;
        $attribute->description = $request->description;

        $attribute->save();

        return response()->json([
            "success" => "attribute created successfully."
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $attribute  = Attribute::find($id);

        if ($attribute === null) {
            return response()->json([
                "error" => "attribute not found."
            ], 404);
        }

        $attribute->name = $request->name;
        $attribute->description = $request->description;

        $attribute->save();


        return response()->json([
            "success" => "attribute updated successfully."
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        $attribute  = Attribute::find($id);

        if ($attribute === null) {
            return response()->json([
                "error" => "attribute not found."
            ], 404);
        }
        $attribute->delete();
        return response()->json([
            "success" => "attribute deleted successfully."
        ], 200);
    }
}
