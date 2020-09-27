<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    // public function product()
    // {
    //     return $this->belongsTo('App\Product');
    // }


    /* 
        TODO: has many payments thrugh user
    */


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
