<?php

namespace App\Http\Controllers\API\Admin;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminCategoryController extends Controller
{

    public function index(Request $request)
    {
        $categories = Category::with('subCategories')->get();

        return response()->json([
            "categories" => $categories->toArray()
        ], 200);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "code" => "required",
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $categ  = new Category();

        $categ->code = $request->code;
        $categ->name = $request->name;
        $categ->description = $request->description;

        $categ->save();

        return response()->json([
            "success" => "category created successfully."
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "code" => "required",
            "name" => "required|max:255",
            "description" => "required|max:255",
        ]);

        $categ  = Category::find($id);

        if ($categ === null) {
            return response()->json([
                "error" => "category not found."
            ], 404);
        }

        if ($request->is_active != "on") {
            $is_active = 0;
        }

        $categ->code = $request->code;
        $categ->name = $request->name;
        $categ->description = $request->description;

        $categ->save();

        return response()->json([
            "success" => "category updated successfully."
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        $data = Category::find($id);

        if ($data === null) {
            return response()->json([
                "error" => "category not found."
            ], 404);
        }

        $data->delete();

        return response()->json([
            "success" => "category deleted successfully."
        ], 200);
    }

    public function getNewCode(Request $request)
    {
        $code = $this->generateCode();
        return response()->json([
            "category_code" => $code
        ], 200);
    }

    protected function generateCode()
    {
        $data = Category::select('id', 'code')->orderBy('id', 'desc')->first();

        if (!empty($data['code'])) {

            $str = $data['code'];

            $matches = array();

            /* 
                ? Match 101, 010, 1001, etc in UID, (only from the end.)
                e.g :- magic(BHR00100) => 100
            */

            preg_match('/[0-9]{5}$/', $str, $matches);

            $num = str_pad(($matches[0] + 1), 7, '0', STR_PAD_LEFT);

            $code = "SHPSTCAT" . $num;
        } else {
            $code = "SHPSTCAT0000001";
        }

        return $code;
    }
}
