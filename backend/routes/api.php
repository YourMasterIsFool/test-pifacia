<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SubTaskController;
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
    Route::resource("project", ProjectController::class);

   
    // Route::resource("user", UserController::class);

    Route::resource("task", TaskController::class);
    Route::resource("sub-task", SubTaskController::class);

    Route::prefix('export')->group(function() {
        Route::post("project", [ProjectController::class, 'export'])->name('project-export');
        Route::post("task", [TaskController::class, 'export'])->name('task-export');
        Route::post("sub-task", [SubTaskController::class, 'export'])->name('sub-task-export');
    });

    Route::get('/profile', [AuthController::class, 'profile'])->name("auth.profile");
});



Route::middleware(["auth:sanctum", 'admin'])->group(function () {
    Route::resource("user", UserController::class);
});
// auth
Route::post('/login', [AuthController::class, 'login'])->name("auth.login");
