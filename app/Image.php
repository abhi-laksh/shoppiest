<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';

    protected $fillable=[
        'src',
        'mime_type',
        'alt',
    ];
    
    public function imageable()
    {
        return $this->morphTo();
    }

}
