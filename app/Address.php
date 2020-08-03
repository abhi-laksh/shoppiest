<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';

    public function user()
    {
        return $this->belongsToMany('App\Order');
    }

    public function addresses()
    {
        return $this->belongsToMany('App\Address');
    }
}
