<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
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
                'name' => "Jockey Men's Regular Fit T-Shirt",
                'short_description' => "Premium combed cotton rich fabric",
                'description' => "Product comes in assorted prints. actual colors and prints might vary for the image shown on the website",
                'selling_price' => 399,
                'cost_price' => 159,
                'stock' => 25,
                'brand_id' => 1,
                'sub_category_id' => 2,
            ],
        ];

        // Does not work... Too lazy to add image details
        foreach ($data as $key => $value) {

            $product = new Product();

            $product->code = "SHPSTPR000000" . ($key + 1);

            $product->name= $value['name'];
            $product->short_description= $value['name']; 
            $product->description= $value['name'];
            $product->selling_price= $value['name'];
            $product->cost_price= $value['name'];
            $product->stock= $value['name'];
            $product->brand_id= $value['name'];
            $product->sub_category_id= $value['name'];

            $product->save();

        }
    }
}
