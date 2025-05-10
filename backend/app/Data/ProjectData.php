<?php

namespace App\Data;

use App\Dto\Project\CreateProjectDto;
use App\Dto\Project\UpdateProjectDto;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\DateFormat;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class ProjectData extends Data
{

    public function __construct(
        #[Required]
        public string $name,

        #[Required]
        public string $start,

        #[Required]
        public string $end,

        public ?string $metadata,

        public ?bool $is_active,

    ) {}



    public static function messages(...$args): array
    {
        return [
            'name.required' => "name tidak boleh kosong",
            'start.required' => "start tidak boleh kosong",
            'start.date' => "start harus format date",
            'end.required' => "end tidak boleh kosong",
            'end.date' => "end harus format date",
        ];
    }
    public function toCreateDto()
    {
        return new CreateProjectDto(
            $this->name,
            $this->start,
            $this->end,
            $this->is_active,
            $this->metadata,
        );
    }

    public function toUpdateDto()
    {
        return new UpdateProjectDto(
            $this->name,
            $this->start,
            $this->end,
            $this->is_active,
            $this->metadata,
        );
    }
}
