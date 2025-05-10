<?php

namespace App\Data;

use App\Dto\Task\CreateTaskDto;
use App\Dto\Task\UpdateTaskDto;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class TaskData extends Data
{

    public function __construct(
        #[Required]
        public string $name,

        #[Required]
        public Carbon $start,

        #[Required, Date]
        public Carbon $end,
        public ?string $metadata,
        public ?bool $is_finish,
        #[Required]
        public string $task_id,
        

    ) {}



    public static function messages(...$args): array
    {
        return [
            'name.required' => "name tidak boleh kosong",
            'start.required' => "start tidak boleh kosong",
            'start.date' => "start harus format date",
            'end.required' => "end tidak boleh kosong",
            'end.date' => "end harus format date",
            'task_id.required' => "task_id tidak boleh kosong",

        ];
    }
    public function toCreateDto()
    {
        return new CreateTaskDto(
            $this->name,
            $this->start,
            $this->end,
            $this->is_finish,
            $this->metadata,
            $this->project_id,
        );
    }

    public function toUpdateDto()
    {
        return new UpdateTaskDto(
            $this->name,
            $this->start,
            $this->end,
            $this->is_finish,
            $this->metadata,
            $this->project_id,
        );
    }
}
