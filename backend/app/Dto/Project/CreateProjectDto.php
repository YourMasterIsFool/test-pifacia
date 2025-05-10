<?php

namespace App\Dto\Project;


class CreateProjectDto
{
    public function __construct(
        public string $name,
        public string $start,
        public string $end,
        public ?bool $is_active,
        public ?string $metadata,
    ) {}
}
