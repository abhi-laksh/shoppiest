<?php

namespace App\Http\Controllers\API\Admin;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\SubCategory;

class AdminSubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $sub_categories = SubCategory::with('category','brands')->get();

        return response()->json([
            "sub_categories" => $sub_categories->toArray()
        ], 200);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "code" => "required",
            "category_id" => "required",
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $categ  = Category::find($request->category_id);

        if ($categ === null) {
            return response()->json([
                "error" => "cannot create sub category. category not found."
            ], 404);
        }

        $subcateg  = new SubCategory();

        $subcateg->code = $request->code;
        $subcateg->name = $request->name;
        $subcateg->description = $request->description;

        $categ->subCategories()->save($subcateg);

        return response()->json([
            "success" => "subcategory created successfully."
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "code" => "required",
            "category_id" => "required",
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $subcateg  = SubCategory::find($id);

        if ($subcateg === null) {
            return response()->json([
                "error" => "subcategory not found."
            ], 404);
        }

        $category = Category::find($request->category_id);

        if ($category === null) {
            return response()->json([
                "error" => "cannot update sub category. category not found."
            ], 404);
        }


        $subcateg->code = $request->code;
        $subcateg->name = $request->name;
        $subcateg->description = $request->description;

        $subcateg->category()->associate($category);

        $subcateg->save();

        return response()->json([
            "success" => "subcategory updated successfully."
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        $data = SubCategory::find($id);

        if ($data === null) {
            return response()->json([
                "error" => "subcategory not found."
            ], 404);
        }

        $data->delete();

        return response()->json([
            "success" => "subcategory deleted successfully."
        ], 200);
    }

    public function getNewCode(Request $request)
    {
        $code = $this->generateCode();
        return response()->json([
            "subcategory_code" => $code
        ], 200);
    }

    protected function generateCode()
    {
        $data = SubCategory::select('id', 'code')->orderBy('id', 'desc')->first();

        if (!empty($data['code'])) {

            $str = $data['code'];

            $matches = array();

            /* 
                ? Match 101, 010, 1001, etc in UID, (only from the end.)
                e.g :- magic(BHR00100) => 100
            */

            preg_match('/[0-9]{5}$/', $str, $matches);

            $num = str_pad(($matches[0] + 1), 7, '0', STR_PAD_LEFT);

            $code = "SHPSTSBCAT" . $num;
        } else {
            $code = "SHPSTSBCAT0000001";
        }

        return $code;
    }
}
