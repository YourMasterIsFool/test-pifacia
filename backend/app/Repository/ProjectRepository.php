<?php

namespace App\Repository;

use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\Project\CreateProjectDto;
use App\Dto\Project\UpdateProjectDto as ProjectUpdateProjectDto;
use App\Models\Project;
use App\Models\ProjectDocument;
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

        $path = $Project->file->store('project-documents', 'public');

        $projectDocument = new ProjectDocument();
        $projectDocument->filename = $Project->file->getClientOriginalName();
        $projectDocument->path = $Project->file;
        $projectDocument->mime_type = $Project->file->getClientMimeType();
        $projectDocument->size = $Project->file->getSize();
        $projectDocument->project_id = $model->id;


        $projectDocument->save();
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
        $project =  $project->with(['creator', 'documents']);
        return $project->get();
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
        $projectDocument = new ProjectDocument();
        $projectDocument->filename = $Project->file->getClientOriginalName();
        $projectDocument->path = $Project->file;
        $projectDocument->mime_type = $Project->file->getClientMimeType();
        $projectDocument->size = $Project->file->getSize();
        $projectDocument->project_id = $model->id;

        return $model;
    }

    public function detail(string $id)
    {
        return  Project::where('id', $id)->with(['audits', 'documents'])->first();
    }

    public function delete(string $id)
    {
        return  Project::where('id', $id)->delete();
    }
}
