<?php

namespace App\Dto\Role;


class CreateRole {
    public function __construct(
        public string $code,
        public string $name,

    )
    {
        
    }
}