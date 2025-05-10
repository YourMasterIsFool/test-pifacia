<?php

namespace App\Dto\Task;


class CreateTaskDto
{
    public function __construct(
        public string $name,
        public string $start,
        public string $end,
        public ?bool $is_finish,
        public ?string $metadata,
        public string $project_id,
    ) {}
}
