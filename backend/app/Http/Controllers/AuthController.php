<?php

namespace App\Http\Controllers;

use App\Data\LoginData;
use App\Services\AuthService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //

    use ResponseTrait;

    public function __construct(
        public AuthService $service
    )
    {
        
    }
    public function login(Request $request) {

        try {
            $validated = LoginData::from($request);
        } catch (\Exception $e) {
            return $this->unProcessableEntity($e->errors());
        }

        return $this->successResponse($this->service->login($validated->toCreateDto()), "Succesfully Login");
    }

    public function profile(Request $request)
    {
        return $this->successResponse($this->service->profile($request->user()->id));
    }


}
