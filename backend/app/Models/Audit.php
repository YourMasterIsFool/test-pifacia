<?php

namespace App\Models;

use App\AuditAction;
use App\AuditFeatures;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Audit extends Model
{
    //

    // buat data enum;

    protected $casts = [
        "action" => AuditAction::class,
        "features" => AuditFeatures::class,
    ];

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
