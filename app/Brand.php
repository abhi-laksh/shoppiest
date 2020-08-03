<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use SoftDeletes;

    protected $table = 'brands';

    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function subCategories()
    {
        return $this->belongsToMany('App\SubCategory');
    }
}
