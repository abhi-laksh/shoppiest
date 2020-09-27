<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    
    use SoftDeletes;

    protected $table = 'products';

    // has many reviews through user
    public function reviewsUser()
    {
        return $this->hasManyThrough('App\Review', 'App\User');
    }

    public function brand()
    {
        return $this->belongsTo('App\Brand');
    }
    // has many orders through user
    public function orders()
    {
        return $this->hasManyThrough('App\Order','App\User');
    }

    public function cart()
    {
        return $this->belongsTo('App\Cart');
    }

    // Each product belongsTo each SubCategory.
    public function subCategory()
    {
        return $this->belongsTo('App\SubCategory');
    }

    public function images()
    {
        return $this->morphMany('App\Image', 'imageable');
    }
    
    public function variants()
    {
        return $this->hasMany('App\Variant');
    }
    
}
