<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid("task_id");
            $table->string('name');
            $table->dateTime("start");
            $table->dateTime('end');
            $table->boolean("is_finish")->default(false);
            $table->json("metadata");
            $table->foreign("task_id")->references("id")->on("tasks")->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_tasks');
    }
};
