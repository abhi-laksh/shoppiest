<?php

namespace App\Http\Controllers\API\Admin;

use App\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\SubCategory;

class AdminBrandController extends Controller
{

    public function create(Request $request)
    {

        $this->validate($request, [
            "code" => "required",
            "sub_category_ids" => "required",
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $subCat = SubCategory::find($request->sub_category_ids);

        if ($subCat === null) {
            return response()->json([
                "error" => "cannot create brand. sub category not found."
            ], 404);
        }

        $brand = new Brand();

        $brand->code = $request->code;
        $brand->name = $request->name;
        $brand->description = $request->description;

        $brand->save();

        $brand->subCategories()->attach($subCat);

        return response()->json([
            "success" => "brand created successfully."
        ], 200);
    }


    public function update(Request $request, $id)
    {

        $this->validate($request, [
            "code" => "required",
            "sub_category_ids" => "required",
            "deleted_sub_category_ids" => "nullable",
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        if (isset($request->deleted_sub_category_ids)) {
            $subCat = SubCategory::find(array_merge(($request->sub_category_ids), ($request->deleted_sub_category_ids)));
        } else {
            $subCat = SubCategory::find($request->sub_category_ids);
        }

        if ($subCat === null) {
            return response()->json([
                "error" => "cannot update brand. sub category not found."
            ], 404);
        }

        $brand = Brand::find($id);

        if ($brand === null) {
            return response()->json([
                "error" => "brand not found."
            ], 404);
        }

        $notFound = array();

        $brand->code = $request->code;
        $brand->name = $request->name;
        $brand->description = $request->description;

        foreach ($subCat as $SC) {
            //? check if not exists SubCategory id
            if (!($brand->subCategories->contains($SC->id))) {
                $brand->subCategories()->attach($SC);
            } else {
                //detach if deleted array has items.
                if (in_array($SC->id, $request->deleted_sub_category_ids, true)) {
                    $brand->subCategories()->detach($SC);
                }
            }
        }

        $brand->save();

        return response()->json([
            "success" => "brand updated successfully."
        ], 200);
    }


    public function delete(Request $request, $id)
    {
        $data = Brand::find($id);

        if ($data === null) {
            return response()->json([
                "error" => "brand not found."
            ], 404);
        }

        $data->subCategories()->detach();
        $data->delete();

        return response()->json([
            "success" => "brand deleted successfully."
        ], 200);
    }


    public function getNewCode(Request $request)
    {
        $code = $this->generateCode();
        return response()->json([
            "brand_code" => $code
        ], 200);
    }

    protected function generateCode()
    {
        $data = Brand::select('id', 'code')->orderBy('id', 'desc')->first();

        if (!empty($data['code'])) {

            $str = $data['code'];

            $matches = array();

            /* 
                ? Match 101, 010, 1001, etc in UID, (only from the end.)
                e.g :- magic(BHR00100) => 100
            */

            preg_match('/[0-9]{5}$/', $str, $matches);

            $num = str_pad(($matches[0] + 1), 7, '0', STR_PAD_LEFT);

            $code = "SHPSTBR" . $num;
        } else {
            $code = "SHPSTBR0000001";
        }

        return $code;
    }
}
