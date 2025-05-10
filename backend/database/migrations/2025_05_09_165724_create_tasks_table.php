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
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('name');
            $table->json('metadata');
            $table->boolean("is_finish")->default(false);
            $table->dateTime("start");
            $table->dateTime('end');
            $table->uuid("project_id");
            $table->foreign("project_id")->references("id")->on("projects")->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
