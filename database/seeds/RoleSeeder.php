<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Must always be lowercase
        $data = [
            // [
            //     "name" => "Owner",
            //     "description" => "The owner of the company.",
            // ],
            [
                "name" => "admin",
                "description" => "You know who they are and what they can do.",
            ],
            [
                "name" => "customer",
                "description" => "The most important person.",
            ],
        ];

        foreach ($data as $key => $value) {
            $cat = new Role();
            $cat->name = $value['name'];
            $cat->description = $value['description'];
            $cat->save();
        }
    }
}
