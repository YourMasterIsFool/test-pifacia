<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProjectDocument extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    // protected $fillable = ['name', 'code'];
    // adding uuid
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = Str::uuid();
            }
        });
    }
}
