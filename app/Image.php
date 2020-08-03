<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';

    protected $fillable=[
        'title',
        'src',
        'mime_type',
        'alt',
        'description'
    ];
    
    public function imageable()
    {
        return $this->morphTo();
    }

}
