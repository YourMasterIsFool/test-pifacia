<?php

namespace App\Services;


use App\Dto\Audit\CreateAuditDto;
use App\Dto\Audit\UpdateAuditDto;
use App\Repository\ProjectRepository;
use App\Repository\AuditRepository;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuditService
{

    use ResponseTrait;
    public function __construct(
        public AuditRepository $Audit_repo,
    ) {}

    public function get(string $masterId, string $featuresType)
    {
        return $this->Audit_repo->get($masterId, $featuresType);
    }
    public function save(CreateAuditDto $schema)
    {
        DB::beginTransaction();
        try {
            $saved =  $this->Audit_repo->save($schema);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed create Audit");
        }
    }
}
