<?php

namespace App\Services;


use App\Dto\Audit\CreateAuditDto;
use App\Dto\Audit\UpdateAuditDto;
use App\Repository\ProjectRepository;
use App\Repository\AuditRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuditService extends ResponseService
{
    public function __construct(
        public AuditRepository $Audit_repo,

        public TaskService $task_service,
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
            dd($e);
            DB::rollBack();
            return $this->internalServer(null, "failed create Audit");
        }
    }

    // public function detail($id)
    // {
    //     $find  =  $this->Audit_repo->detail($id);

    //     if (!$find) {
    //         return $this->notFound(null, "Audit Not Found");
    //     }

    //     return $find;
    // }

    // public function update($id, UpdateAuditDto $schema)
    // {
    //     $findTask =  $this->task_service->detail($schema->task_id);

    //     $find  =  $this->detail($id);
    //     DB::beginTransaction();
    //     try {
    //         $saved =  $this->Audit_repo->update($id, $schema);
    //         DB::commit();
    //         return $saved;
    //     } catch (\Exception $e) {
    //         Log::info($e);
    //         DB::rollBack();
    //         return $this->internalServer(null, "failed update Audit");
    //     }
    // }

    // public function delete($id)
    // {
    //     $find  =  $this->detail($id);

    //     if (!$find) {
    //         return $this->notFound(null, "Audit Not Found");
    //     }
    //     DB::beginTransaction();
    //     try {
    //         $saved =  $this->Audit_repo->delete($id);
    //         DB::commit();
    //         return $saved;
    //     } catch (\Exception $e) {
    //         Log::info($e);
    //         DB::rollBack();
    //         return $this->internalServer(null, "failed update Audit");
    //     }
    // }
}
