<?php
namespace App\Repository;

use App\Dto\Datatable\DatatableFilterDto;
use App\Dto\Role\CreateRole as RoleCreateRole;
use App\Dto\Role\UpdateRole;
use App\Models\Role;
use CreateRole;

class RoleRepository {
    public function save(RoleCreateRole $role) {
        $model = new Role();
        $model->code =  $role->code;
        $model->name =  $role->name;
        $model->save();
        return $model;
    }

    public function get(DatatableFilterDto $filter) {

        $query  = Role::query();
        if ($filter->search) {
            $query =  $query->where('name', 'like', '%' . $filter->search . '%');
        }
        if ($filter->sorting) {
            $query =  $query->orderBy('created_at', $filter->sorting);
        }
        return $query->get();
    }

    public function update(string $id,UpdateRole $role)
    {
        $model = Role::find($id);
        $model->code =  $role->code;
        $model->name =  $role->name;
        $model->save();
        return $model;
    }

    public function detail(string $id)
    {
        return  Role::where('id', $id)->first();
    }

    public function delete(string $id)
    {
        return  Role::where('id', $id)->delete();
    }
}
