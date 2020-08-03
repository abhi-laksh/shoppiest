<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    // has many product through user
    public function productsUser()
    {
        return $this->hasManyThrough('App\Product', 'App\User');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    // has one address through user
    public function address()
    {
        return $this->hasOneThrough('App\Address', 'App\User');
    }
}
