<?php

namespace App\Data;

use App\Dto\User\CreateUserDto as UserCreateUserDto;
use App\Dto\User\UpdateUserDto as UserUpdateUserDto;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UserData extends Data
{

    public function __construct(
        #[Required]
        public string $name,

        #[Required]
        public string $code,

        #[Required]
        public string $email,

        #[Required]
        public string $password,

        #[Required]
        public string $role_id,

    ) {}



    public static function messages(...$args): array
    {
        return [
            'name.required' => "name tidak boleh kosong",
            'code.required' => "code tidak boleh kosong",
            'email.required' => "email tidak boleh kosong",
            'password.required' => "password tidak boleh kosong",
            'role_id.required' => "role_id tidak boleh kosong",



        ];
    }
    public function toCreateDto()
    {
        return new UserCreateUserDto(
            $this->name,
            $this->email,
            $this->password,
            $this->role_id
        );
    }

    public function toUpdateDto()
    {
        return new UserUpdateUserDto(
            $this->name,
            $this->email,
            $this->password,
            $this->role_id
        );
    }
}
