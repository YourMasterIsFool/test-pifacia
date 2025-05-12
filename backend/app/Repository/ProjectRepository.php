<?php

namespace App\Repository;

use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\Project\CreateProjectDto;
use App\Dto\Project\UpdateProjectDto as ProjectUpdateProjectDto;
use App\Models\Project;

use Illuminate\Support\Facades\Hash;

class ProjectRepository
{
    public function save(CreateProjectDto $Project)
    {
        $model = new Project();
        $model->name =  $Project->name;
        $model->start =  $Project->start;
        $model->end =  $Project->end;
        $model->metadata =  $Project->metadata ? json_encode($Project->metadata) : "";
        $model->creator_id =  auth()->user()->id;
        $model->is_active =  $Project->is_active ?? true;

        $model->save();
        return $model;
    }

    public function get(DatatableFilterDto $filter)
    {   

        $project  = Project::query();
        if($filter->search) {
            $project =  $project->where('name', 'like', '%'.$filter->search.'%');
        }
        if ($filter->sorting) {
            $project =  $project->orderBy('created_at', $filter->sorting);
        }
        return $project->select(['name', 'start', 'end', 'id'])->with(['creator'])->get();
    }

    public function update(string $id, ProjectUpdateProjectDto $Project)
    {
        $model = Project::find($id);
        $model->name =  $Project->name;
        $model->start =  $Project->start;
        $model->end =  $Project->end;
        $model->metadata =  $Project->metadata ? json_encode($Project->metadata) : "";
        $model->is_active =  $Project->is_active ?? true;
        $model->save();
        return $model;
    }

    public function detail(string $id)
    {
        return  Project::where('id', $id)->with('audits')->first();
    }

    public function delete(string $id)
    {
        return  Project::where('id', $id)->delete();
    }
}
