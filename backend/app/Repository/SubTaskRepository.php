<?php

namespace App\Repository;

use App\Dto\SubTask\CreateSubTaskDto;
use App\Dto\SubTask\UpdateSubTaskDto as SubTaskUpdateSubTaskDto;
use App\Models\SubTask;

class SubTaskRepository
{
    public function save(CreateSubTaskDto $SubTask)
    {
        $model = new SubTask();
        $model->name =  $SubTask->name;
        $model->start =  $SubTask->start;
        $model->end =  $SubTask->end;
        $model->metadata =  $SubTask->metadata ? json_encode($SubTask->metadata)  : "";
        $model->is_finish =  $SubTask->is_finish ?? true;
        $model->task_id = $SubTask->task_id;

        $model->save();
        return $model;
    }

    public function get()
    {
        return SubTask::get();
    }

    public function update(string $id, SubTaskUpdateSubTaskDto $SubTask)
    {
        $model = SubTask::find($id);
        $model->name =  $SubTask->name;
        $model->start =  $SubTask->start;
        $model->end =  $SubTask->end;
        $model->metadata =  $SubTask->metadata ? json_encode($SubTask->metadata)  : "";
        $model->is_finish =  $SubTask->is_finish ?? true;
        $model->task_id = $SubTask->task_id;
        $model->save();
        return $model;
    }

    public function detail(string $id)
    {
        return  SubTask::where('id', $id)->first();
    }

    public function delete(string $id)
    {
        return  SubTask::where('id', $id)->delete();
    }
}
