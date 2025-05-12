<?php

namespace App\Services;

use App\AuditAction;
use App\AuditFeatures;
use App\Dto\Audit\CreateAuditDto;
use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\SubTask\CreateSubTaskDto;
use App\Dto\SubTask\UpdateSubTaskDto;
use App\Exports\DynamicExport;
use App\Models\SubTask;
use App\Repository\ProjectRepository;
use App\Repository\SubTaskRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class SubTaskService extends ResponseService
{
    public function __construct(
        public SubTaskRepository $SubTask_repo,
        public TaskService $task_service,
        public AuditService $audit_service,
    ) {}

    public function get(DatatableFilterDto $filter)
    {
        return $this->SubTask_repo->get($filter);
    }
    public function save(CreateSubTaskDto $schema)
    {

        $findTask =  $this->task_service->detail($schema->task_id);
        DB::beginTransaction();
        try {
            $saved =  $this->SubTask_repo->save($schema);
            $auditDto = new CreateAuditDto(auth()->user()->name, "Create SubTask $saved->name", AuditAction::CREATE, AuditFeatures::SUBTASK, $saved->id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed create SubTask");
        }
    }

    public function detail($id)
    {
        $find  =  $this->SubTask_repo->detail($id);

        if (!$find) {
            return $this->notFound(null, "SubTask Not Found");
        }

        return $find;
    }

    public function update($id, UpdateSubTaskDto $schema)
    {
        $findTask =  $this->task_service->detail($schema->task_id);

        $find  =  $this->detail($id);
        DB::beginTransaction();
        try {
            $saved =  $this->SubTask_repo->update($id, $schema);
            $auditDto = new CreateAuditDto(auth()->user()->name, "Update SubTask $saved->name", AuditAction::UPDATE, AuditFeatures::SUBTASK, $saved->id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update SubTask");
        }
    }

    public function delete($id)
    {
        $find  =  $this->detail($id);

        if (!$find) {
            return $this->notFound(null, "SubTask Not Found");
        }
        DB::beginTransaction();
        try {
            $saved =  $this->SubTask_repo->delete($id);

            $auditDto = new CreateAuditDto(auth()->user()->name, "Deleted SubTask", AuditAction::DELETE, AuditFeatures::SUBTASK, $id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update SubTask");
        }
    }

    public function export(array $requestColumns)
    {
        $columns = $requestColumns;
        $project = new SubTask();
        return Excel::download(new DynamicExport($project, $columns), 'project.xlsx');
    }
}
