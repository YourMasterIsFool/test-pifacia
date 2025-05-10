<?php

namespace App\Services;


use App\Dto\SubTask\CreateSubTaskDto;
use App\Dto\SubTask\UpdateSubTaskDto;
use App\Repository\ProjectRepository;
use App\Repository\SubTaskRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SubTaskService extends ResponseService
{
    public function __construct(
        public SubTaskRepository $SubTask_repo,

        public TaskService $task_service,
    ) {}

    public function get()
    {
        return $this->SubTask_repo->get();
    }
    public function save(CreateSubTaskDto $schema)
    {

        $findTask =  $this->task_service->detail($schema->task_id);
        DB::beginTransaction();
        try {
            $saved =  $this->SubTask_repo->save($schema);

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
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update SubTask");
        }
    }
}
