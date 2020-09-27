<?php

use App\Address;
use App\User;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
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
                "user_id" => 2,
                "full_name" => "Abhishek Soni",
                "phone" => "9876543210",
                "alternate_phone" => "9876543214",
                "house_number" => "14",
                "street" => "XYZ",
                "landmark" => "XYZ",
                "city" => "ABCD",
                "state" => "WB",
                "pincode" => "700014",
                "type" => "home"
            ],
            [
                "user_id" => 2,
                "full_name" => "Abhishek Soni",
                "phone" => "9876543211",
                "alternate_phone" => "9876543212",
                "house_number" => "14",
                "street" => "XYZ",
                "landmark" => "XYZ",
                "city" => "ABCD",
                "state" => "WB",
                "pincode" => "700014",
                "type" => "office"
            ],
        ];

        foreach ($data as $value) {
            $user = User::find($value['user_id']);

            $address = new Address();

            $address->full_name = $value['full_name'];
            $address->phone = $value['phone'];
            $address->alternate_phone = $value['alternate_phone'];
            $address->house_number = $value['house_number'];
            $address->street = $value['street'];
            $address->landmark = $value['landmark'];
            $address->city = $value['city'];
            $address->state = $value['state'];
            $address->pincode = $value['pincode'];
            $address->type = $value['type'];

            $address->save();

            $user->addresses()->attach($address);
        }
    }
}
