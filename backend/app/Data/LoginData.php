<?php

namespace App\Data;

use App\Dto\Auth\LoginDto;


use Carbon\Carbon;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\DateFormat;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class LoginData extends Data
{

    public function __construct(
        #[Required]
        public string $email,

        #[Required]
        public string $password,


    ) {}



    public static function messages(...$args): array
    {
        return [
            'email.required' => "email tidak boleh kosong",
            'password.required' => "password tidak boleh kosong",
           
        ];
    }
    public function toCreateDto()
    {
        return new LoginDto(
            $this->email,
            $this->password,
        
        );
    }

  
}
