<?php

namespace App\Dto\SubTask;


class CreateSubTaskDto
{
    public function __construct(
        public string $name,
        public string $start,
        public string $end,
        public ?bool $is_finish,
        public ?string $metadata,
        public string $task_id,
    ) {}
}
