<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::middleware("auth:sanctum")->group(function () {
    Route::resource("role", RoleController::class);
    Route::resource("user", UserController::class);
    Route::resource("project", ProjectController::class);
    Route::resource("task", TaskController::class);
});

Route::post('/login', [AuthController::class, 'login'])->name("auth.login");
