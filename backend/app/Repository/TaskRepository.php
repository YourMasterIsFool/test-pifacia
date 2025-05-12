<?php

namespace App\Repository;

use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\Task\CreateTaskDto;
use App\Dto\Task\UpdateTaskDto as TaskUpdateTaskDto;
use App\Models\Task;

use Illuminate\Support\Facades\Hash;

class TaskRepository
{
    public function save(CreateTaskDto $Task)
    {
        $model = new Task();
        $model->name =  $Task->name;
        $model->start =  $Task->start;
        $model->end =  $Task->end;
        $model->metadata =  $Task->metadata ? json_encode($Task->metadata)  : "";

        $model->is_finish =  $Task->is_finish ?? true;
        $model->project_id = $Task->project_id;

        $model->save();
        return $model;
    }

    public function get(DatatableFilterDto $filter)
    {
        $query  = Task::query();
        if ($filter->search) {
            $query =  $query->where('name', 'ilike', '%' . $filter->search . '%');
        }
        if ($filter->sorting) {
            $query =  $query->orderBy('created_at', $filter->sorting);
        }
        return $query->with(['project:id,name'])->get();
    }

    public function update(string $id, TaskUpdateTaskDto $Task)
    {
        $model = Task::find($id);
        $model->name =  $Task->name;
        $model->start =  $Task->start;
        $model->end =  $Task->end;
        $model->metadata =  $Task->metadata ? json_encode($Task->metadata)  :"";
        $model->is_finish =  $Task->is_finish ?? true;
        $model->project_id = $Task->project_id;
        $model->save();
        return $model;
    }

    public function detail(string $id)
    {
        return  Task::where('id', $id)->with(['audits', 'project:id,name'])->first();
    }

    public function delete(string $id)
    {
        return  Task::where('id', $id)->delete();
    }
}
