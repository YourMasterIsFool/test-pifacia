<?php

namespace App\Data;

use App\Dto\Role\CreateRole;
use App\Dto\CreateRoleDto;
use App\Dto\Role\UpdateRole;
use App\Dto\UpdateRoleDto;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class RoleData extends Data
{

    public function __construct(
        #[Required]
        public string $name,

        #[Required]
        public string $code,

    ) {}



    public static function messages(...$args): array
    {
        return [
            'name.required' => "name tidak boleh kosong",
            'code.required' => "code tidak boleh kosong",

        ];
    }
    public function toCreateDto()
    {
        return new CreateRole(
            $this->name,
            $this->code,
        );
    }

    public function toUpdateDto()
    {
        return new UpdateRole(
            $this->name,
            $this->code,
        );
    }
}
