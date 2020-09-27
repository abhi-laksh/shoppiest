<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Variant extends Model
{
    use SoftDeletes;
    
    protected $table = 'variants';

    public function attributeValues()
    {
        return $this->belongsToMany('App\AttributeValue', 'variant_attribute_value');
    }

    public function product()
    {
        return $this->belongsTo('App\Product');
    }

    public function images()
    {
        return $this->morphMany('App\Image', 'imageable');
    }
}
