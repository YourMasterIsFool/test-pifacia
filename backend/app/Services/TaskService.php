<?php

namespace App\Services;

use App\AuditAction;
use App\AuditFeatures;
use App\Dto\Audit\CreateAuditDto;
use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\Task\CreateTaskDto;
use App\Dto\Task\UpdateTaskDto;
use App\Exports\DynamicExport;
use App\Models\Task;
use App\Repository\ProjectRepository;
use App\Repository\TaskRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class TaskService extends ResponseService
{
    public function __construct(
        public TaskRepository $Task_repo,
        public ProjectService $project_service,
        public AuditService $audit_service,

    ) {}

    public function get(DatatableFilterDto $filter)
    {
        return $this->Task_repo->get($filter);
    }
    public function save(CreateTaskDto $schema)
    {

        $findProject =  $this->project_service->detail($schema->project_id);
        DB::beginTransaction();
        try {
            $saved =  $this->Task_repo->save($schema);
            $auditDto = new CreateAuditDto(auth()->user()->name, "Create Task $saved->name", AuditAction::CREATE, AuditFeatures::TASK, $saved->id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed create Task");
        }
    }

    public function detail($id)
    {
        $find  =  $this->Task_repo->detail($id);

        if (!$find) {
            return $this->notFound(null, "Task Not Found");
        }

        return $find;
    }

    public function update($id, UpdateTaskDto $schema)
    {
        $findProject =  $this->project_service->detail($schema->project_id);
        $find  =  $this->detail($id);


        DB::beginTransaction();
        try {
            $saved =  $this->Task_repo->update($id, $schema);
            $auditDto = new CreateAuditDto(auth()->user()->name, "Update Task $saved->name", AuditAction::UPDATE, AuditFeatures::TASK, $saved->id);
            $this->audit_service->save($auditDto);

            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update Task");
        }
    }

    public function delete($id)
    {
        $find  =  $this->detail($id);

        if (!$find) {
            return $this->notFound(null, "Task Not Found");
        }
        DB::beginTransaction();
        try {
            $saved =  $this->Task_repo->delete($id);
            DB::commit();
            $auditDto = new CreateAuditDto(auth()->user()->name, "Deleted Task", AuditAction::DELETE, AuditFeatures::TASK, $id);
            $this->audit_service->save($auditDto);
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update Task");
        }
    }

    public function export(array $requestColumns)
    {
        $columns = $requestColumns;
        $project = new Task();
        return Excel::download(new DynamicExport($project, $columns), 'project.xlsx');
    }
}
