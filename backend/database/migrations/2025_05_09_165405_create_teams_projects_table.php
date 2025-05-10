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
        Schema::create('teams_projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->json("metadata");
            // disii title description task dan lain lain
            $table->uuid("member_id");
            $table->uuid("project_id");
            $table->foreign("member_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("project_id")->references("id")->on("projects")->onDelete("cascade");
            $table->boolean("is_active")->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams_projects');
    }
};
