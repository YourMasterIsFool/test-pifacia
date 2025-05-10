<?php

namespace App\Dto\Datatable;


class DatatableFilterDto
{
    public function __construct(
        public ?string $search,
        public ?string $sorting =  'DESC',
    ) {}
}
