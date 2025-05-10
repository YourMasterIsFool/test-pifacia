<?php

namespace App\Services;


use App\Dto\Task\CreateTaskDto;
use App\Dto\Task\UpdateTaskDto;
use App\Repository\ProjectRepository;
use App\Repository\TaskRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TaskService extends ResponseService
{
    public function __construct(
        public TaskRepository $Task_repo,
        public ProjectRepository $project_repo,
    ) {}

    public function get()
    {
        return $this->Task_repo->get();
    }
    public function save(CreateTaskDto $schema)
    {

        $findProject =  $this->project_repo->detail($schema->project_id);
        DB::beginTransaction();
        try {
            $saved =  $this->Task_repo->save($schema);

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
        $findProject =  $this->project_repo->detail($schema->project_id);
        $find  =  $this->detail($id);
        DB::beginTransaction();
        try {
            $saved =  $this->Task_repo->update($id, $schema);
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
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update Task");
        }
    }
}
