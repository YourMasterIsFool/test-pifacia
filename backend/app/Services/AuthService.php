<?php

namespace App\Services;

use App\Dto\Auth\LoginDto;
use App\Dto\User\UpdateUser;
use App\Dto\User\CreateUserDto;
use App\Dto\User\UpdateUserDto;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthService extends ResponseService
{
    public function __construct(
        public UserRepository $User_repo,
        public RoleService $role_service,

    ) {}


    public function login(LoginDto $login) {
        $findByUser =  $this->User_repo->findByEmail($login->email);

        if(!$findByUser) {
            return $this->notFound(['email' => "email tidak ada"]);
        }

        if (!Hash::check($login->password, $findByUser->password)) {
            return $this->badRequestResponse(['password' => "password tidak sama"]);
        }

        $credential = [
            'email' => $login->email,
            "password" => $login->password,
        ];
        Auth::attempt($credential);
        return [
            'token' => auth()->user()->createToken("auth_token")->plainTextToken        
        ];
    }
}
