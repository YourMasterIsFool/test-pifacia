<?php 
namespace App\Services;

use App\Dto\Role\CreateRole as RoleCreateRole;
use App\Dto\Role\UpdateRole;
use App\Repository\RoleRepository;
use CreateRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoleService extends ResponseService {
    public function __construct(
        public RoleRepository $role_repo,
    )
    {
        
    }

    public function get()
    {
        return $this->role_repo->get();
    }
    public function save(RoleCreateRole $schema) {
        DB::beginTransaction();
        try {
            $saved =  $this->role_repo->save($schema);

            DB::commit();
            return $saved;
        }
        catch(\Exception $e) {
            Log::info($e);

       

            DB::rollBack();
            return $this->internalServer(null, "failed create role");
        }
    }

    public function detail($id)
    {
        $find  =  $this->role_repo->detail($id);

        if(!$find) {
            return $this->notFound(null, "Role Not Found");
        }

        return $find;
    }

    public function update($id, UpdateRole $schema)
    {
        $find  =  $this->detail($id);

        DB::beginTransaction();
        try {
            $saved =  $this->role_repo->update($id,$schema);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update role");
        }
    }

    public function delete($id)
    {
        $find  =  $this->detail($id);

        if (!$find) {
            return $this->notFound(null, "Role Not Found");
        }
        DB::beginTransaction();
        try {
            $saved =  $this->role_repo->delete($id);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update role");
        }
    }
}