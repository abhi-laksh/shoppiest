<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
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
                "name" => "Admin Sahb",
                "email" => "admin@gmail.com",
                "phone" => "9876543210",
                "password" => bcrypt("123"),
                "role_id" => 1,
            ],
            [
                "name" => "Abhishek Soni",
                "email" => "as@gmail.com",
                "phone" => "9876573210",
                "password" => bcrypt("123"),
                "role_id" => 2,
            ],
        ];

        foreach ($data as $key => $value) {
            $role  = Role::find($value['role_id']);

            $user = new User();

            $user->name = $value['name'];
            $user->email = $value['email'];
            $user->phone = $value['phone'];
            $user->password = $value['password'];

            $role->users()->save($user);
            // $user->role()->save($role);
        }
    }
}
