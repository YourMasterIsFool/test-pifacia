<?php

namespace App\Services;


use App\Dto\User\UpdateUser;
use App\Dto\User\CreateUserDto;
use App\Dto\User\UpdateUserDto;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserService extends ResponseService
{
    public function __construct(
        public UserRepository $User_repo,
        public RoleService $role_service,

    ) {}

    public function get()
    {
        return $this->User_repo->get();
    }
    public function save(CreateUserDto $schema)
    {

        $findRole =  $this->role_service->detail($schema->role_id);


        DB::beginTransaction();
        try {
            $saved =  $this->User_repo->save($schema);

            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed create User");
        }
    }

    public function detail($id)
    {
        $find  =  $this->User_repo->detail($id);

        if (!$find) {
            return $this->notFound(null, "User Not Found");
        }

        return $find;
    }

    public function update($id, UpdateUserDto $schema)
    {

        $findRole =  $this->role_service->detail($schema->role_id);
        $find  =  $this->detail($id);

        DB::beginTransaction();
        try {
            $saved =  $this->User_repo->update($id, $schema);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update User");
        }
    }

    public function delete($id)
    {
        $find  =  $this->detail($id);

        if (!$find) {
            return $this->notFound(null, "User Not Found");
        }
        DB::beginTransaction();
        try {
            $saved =  $this->User_repo->delete($id);
            DB::commit();
            return $saved;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, "failed update User");
        }
    }
}
