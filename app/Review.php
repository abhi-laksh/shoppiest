<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    protected $table = 'reviews';

    public function user()
    {
        return $this->belongsToMany('App\User');
    }

    // public function product()
    // {
    //     return $this->belongsToMany('App\Product');
    // }
}
