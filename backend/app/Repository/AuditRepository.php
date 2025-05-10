<?php

namespace App\Repository;

use App\Dto\Audit\CreateAuditDto;
use App\Dto\Audit\UpdateAuditDto as AuditUpdateAuditDto;
use App\Models\Audit;

use Illuminate\Support\Facades\Hash;

class AuditRepository
{
    public function save(CreateAuditDto $Audit)
    {
        $model = new Audit();
        $model->notes =  $Audit->notes;
        $model->creator_name =  $Audit->creator_name;
        $model->master_id =  $Audit->master_id;
        $model->action =  $Audit->action ?? "";
        $model->features =  $Audit->features;
        $model->save();
        return $model;
    }

    public function get($masterId, $featuresType)
    {
        return Audit::where("master_id", $masterId)->where("features", $featuresType);
    }
}
