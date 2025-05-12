<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;


class Project extends Model
{

    use SoftDeletes;

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

    public function audits() {
        return $this->hasMany(Audit::class, 'master_id', 'id');
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id', 'id');
    }
    //
}
