<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
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
                "name" => "Electronic",
                "description" => "Electronics is a category",
                "abbreviation" => "EL",
            ],
            [
                "name" => "Fashion",
                "description" => "Fashion is a category",
                "abbreviation" => "FN",
            ],
            [
                "name" => "Travel",
                "description" => "Travel is a category",
                "abbreviation" => "TR",
            ],
            [
                "name" => "Education",
                "description" => "Educations is a category",
                "abbreviation" => "ED",
            ]
        ];

        foreach ($data as $key => $value) {
            $cat = new Category();
            $cat->code = "SHPSTCAT000000".($key+1);
            $cat->name = $value['name'];
            $cat->abbreviation = $value['abbreviation'];
            $cat->description = $value['description'];
            $cat->save();
        }

    }
}
