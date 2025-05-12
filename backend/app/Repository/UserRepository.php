<?php

namespace App\Repository;

use App\Dto\User\CreateUserDto;
use App\Dto\User\UpdateUserDto as UserUpdateUserDto;
use App\Models\User;
use CreateUser;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function save(CreateUserDto $User)
    {
        $model = new User();
        $model->email =  $User->email;
        $model->name =  $User->name;
        $model->role_id =  $User->role_id;
        $model->password =  Hash::make($User->password);
        $model->save();
        return $model;
    }

    public function get()
    {
        return User::with(['role:id,name'])->get();
    }

    public function update(string $id, UserUpdateUserDto $User)
    {
        $model = User::find($id);
        $model->email =  $User->email;
        $model->name =  $User->name;
        $model->role_id =  $User->role_id;
        $model->save();
        return $model;
    }

    public function detail(string $id)
    {
        return  User::where('id', $id)->with('role')->first();
    }

    public function delete(string $id)
    {
        return  User::where('id', $id)->delete();
    }

    public function findByEmail(string $email) {
        return User::where("email", $email)->first();
    }
}
