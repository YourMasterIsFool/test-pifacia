<?php

namespace App\Services;

use App\AuditAction;
use App\AuditFeatures;
use App\Dto\Audit\CreateAuditDto;
use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\Project\UpdateProject;
use App\Dto\Project\CreateProjectDto;
use App\Dto\Project\UpdateProjectDto;
use App\Exports\DynamicExport;
use App\Models\Project;
use App\Repository\ProjectRepository;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class ProjectService
{   
    use ResponseTrait;
    public function __construct(
        public ProjectRepository $Project_repo,
        public AuditService $audit_service,
    ) {}

    public function get(DatatableFilterDto $filter)
    {
        return $this->Project_repo->get($filter);
    }
    public function save(CreateProjectDto $schema)
    {
        DB::beginTransaction();
        try {

            Log::info("MEMORY START: " . memory_get_usage(true));
            $saved =  $this->Project_repo->save($schema);

            Log::info("MEMORY AFTER SAVE: " . memory_get_usage(true));
            // create audit
            $auditDto = new CreateAuditDto(auth()->user()->name, "Create Project $saved->name", AuditAction::CREATE, AuditFeatures::PROJECT, $saved->id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);

            dd($e);
            DB::rollBack();
            return $this->internalServer(null, "failed create Project");
        }
    }

    public function detail($id)
    {
        $find  =  $this->Project_repo->detail($id);

        if (!$find) {
            return $this->notFound(null, "Project Not Found");
        }

        return $find;
    }

    public function update($id, UpdateProjectDto $schema)
    {

        $find  =  $this->detail($id);
        DB::beginTransaction();
        try {
            $saved =  $this->Project_repo->update($id, $schema);
           
            // save into audit
            $auditDto = new CreateAuditDto(auth()->user()->name, "Update Project to $saved->name", AuditAction::UPDATE, AuditFeatures::PROJECT, $saved->id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);

            DB::rollBack();
            return $this->internalServer(null, "failed update Project");
        }
    }

    public function delete($id)
    {
        $find  =  $this->detail($id);

        if (!$find) {
            return $this->notFound(null, "Project Not Found");
        }
        DB::beginTransaction();
        try {
            $saved =  $this->Project_repo->delete($id);
            $auditDto = new CreateAuditDto(auth()->user()->name, "Delete Project", AuditAction::DELETE, AuditFeatures::PROJECT, $id);
            $this->audit_service->save($auditDto);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update Project");
        }
    }


    public function export(array $requestColumns) {
        $columns = $requestColumns;
        $project = new Project();
        return Excel::download(new DynamicExport($project, $columns), 'project.xlsx');
    }
}
