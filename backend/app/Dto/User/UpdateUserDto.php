<?php

namespace App\Dto\User;


class UpdateUserDto
{
    public function __construct(
        public string $name,
        public string $id,
        public string $email,
        public string $role_id,

    ) {}
}
