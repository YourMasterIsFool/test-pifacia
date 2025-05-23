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
        public string $start,

        #[Required]
        public string $end,
        public ?string $metadata,
        public ?bool $is_finish,

        #[Required]
        public string $project_id,
        

    ) {}



    public static function rules(): array
    {
        return [
            'start' => 'required|date',
            'end' => 'required|date',

        ];
    }

    public static function messages(...$args): array
    {
        return [
            'name.required' => "name tidak boleh kosong",
            'start.required' => "start tidak boleh kosong",
            'start.date' => "start harus format date",
            'end.required' => "end tidak boleh kosong",
            'end.date' => "end harus format date",
            'project_id.required' => "project_id tidak boleh kosong",

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
