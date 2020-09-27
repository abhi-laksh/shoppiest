<?php

use App\Category;
use App\SubCategory;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "name" => "Mobile",
                "description" => "Mobile is a sub category",
                "abbreviation" => "MB",
                "category_id" => 1
            ],
            [
                "name" => "Laptops",
                "description" => "Laptops is a sub category",
                "abbreviation" => "LP",
                "category_id" => 1
            ],
            [
                "name" => "Luggage",
                "description" => "Luggage is a sub category",
                "abbreviation" => "LUG",
                "category_id" => 3
            ],
            [
                "name" => "Summer",
                "description" => "Summer is a sub category",
                "abbreviation" => "SUM",
                "category_id" => 2
            ],
            [
                "name" => "Winter",
                "description" => "Winter is a sub category",
                "abbreviation" => "WIN",
                "category_id" => 2
            ],
            [
                "name" => "Sports",
                "description" => "Sports is a sub category",
                "abbreviation" => "SP",
                "category_id" => 2
            ],
        ];

        foreach ($data as $key => $value) {
            $categ  = Category::find($value['category_id']);
            $sub_cat = new SubCategory();
            $sub_cat->code = "SHPSTSBCAT000000" . ($key + 1);
            $sub_cat->name = $value['name'];
            $sub_cat->abbreviation = $value['abbreviation'];
            $sub_cat->description = $value['description'];
            $categ->subCategories()->save($sub_cat);
        }
    }
}
