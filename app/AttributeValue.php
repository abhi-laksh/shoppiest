<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    protected $table = 'attribute_values';

    public function attribute()
    {
        return $this->belongsTo('App\AttributeValue');
    }

    public function variants()
    {
        return $this->belongsToMany('App\Variant', 'variant_attribute_value');
    }
}
