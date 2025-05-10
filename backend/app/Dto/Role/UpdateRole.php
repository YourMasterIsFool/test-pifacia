<?php
namespace App\Dto\Role;


class UpdateRole
{
    public function __construct(
        public string $code,
        public string $name,

    ) {}
}
