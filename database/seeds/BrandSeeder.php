<?php

use App\Brand;
use App\Category;
use App\SubCategory;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
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
                "name" => "Apple",
                "description" => "Apple is best",
                "sub_category_ids" => [1, 2]
            ],

            [
                "name" => "Xiaomi",
                "description" => "Xiaomi is best",
                "sub_category_ids" => [1]
            ],

            [
                "name" => "American Tourister",
                "description" => "American Tourister is best",
                "sub_category_ids" => [3]
            ],

            [
                "name" => "Nike",
                "description" => "Nike is best",
                "sub_category_ids" => [6]
            ],

        ];

        foreach ($data as $key => $value) {
            $brand = new Brand();

            $sub_cat = SubCategory::find($value['sub_category_ids']);

            $brand->code = "SHPSTBR000000" . ($key + 1);
            $brand->name = $value['name'];
            $brand->description = $value['description'];

            $brand->save();

            $brand->subCategories()->attach($sub_cat);

        }
    }
}
