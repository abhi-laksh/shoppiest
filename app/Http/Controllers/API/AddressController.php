<?php

namespace App\Http\Controllers\API;

use App\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{

    public function index(Request $request)
    { 
        $user = User::find(Auth::user()->id);

        return response()->json([
            "addresses" => $user->addresses
        ], 200);
    }


    public function create(Request $request)
    {

        $this->validate($request, [
            "full_name" => "required",
            "phone" => "required|max:10",
            "alternate_phone" => "nullable|max|10",
            "house_number" => "required",
            "street" => "required",
            "landmark" => "nullable|max:255",
            "city" => "required|max:255",
            "state" => "required|max:255",
            "pincode" => "required|max:6",
            "type" => "required|in:home,office",
        ]);

        $user = User::find(Auth::user()->id);

        $address = new Address();


        $address->full_name = $request->full_name;
        $address->phone = $request->phone;
        $address->alternate_phone = $request->alternate_phone;
        $address->house_number = $request->house_number;
        $address->street = $request->street;
        $address->landmark = $request->landmark;
        $address->city = $request->city;
        $address->state = $request->state;
        $address->pincode = $request->pincode;
        $address->type = $request->type;

        $address->save();

        $user->addresses()->attach($address);

        return response()->json([
            "success" => "address created successfully."
        ], 200);
    }

    public function update(Request $request, $id)
    {

        $this->validate($request, [
            "full_name" => "required",
            "phone" => "required|max:10",
            "alternate_phone" => "nullable|max:10",
            "house_number" => "required",
            "street" => "required",
            "landmark" => "nullable|max:255",
            "city" => "required|max:255",
            "state" => "required|max:255",
            "pincode" => "required|max:6",
            "type" => "required|in:home,office",
        ]);

        $user = User::find(Auth::user()->id);

        $address = $user->addresses()->where('address_id', $id)->first();

        if ($address === null) {
            return response()->json([
                "error" => "address not found."
            ], 404);
        }

        $address->full_name = $request->full_name;
        $address->phone = $request->phone;
        $address->alternate_phone = $request->alternate_phone;
        $address->house_number = $request->house_number;
        $address->street = $request->street;
        $address->landmark = $request->landmark;
        $address->city = $request->city;
        $address->state = $request->state;
        $address->pincode = $request->pincode;
        $address->type = $request->type;

        $address->save();

        // $user->addresses()->attach($address);

        return response()->json([
            "success" => "address updated successfully."
        ], 200);
    }

    public function delete(Request $request, $id)
    {

        $user = User::find(Auth::user()->id);

        $data = $user->addresses()->where('address_id', $id)->first();

        // return response()->json([
        //     "data" => $data
        // ], 404);

        if ($data === null) {
            return response()->json([
                "error" => "address not found."
            ], 404);
        }

        $user->addresses()->detach($data);

        $data->delete();

        return response()->json([
            "success" => "address deleted successfully."
        ], 200);
    }
}
