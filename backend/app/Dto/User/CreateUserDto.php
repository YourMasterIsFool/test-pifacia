<?php

namespace App\Dto\User;


class CreateUserDto
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public string $role_id,



    ) {}
}
