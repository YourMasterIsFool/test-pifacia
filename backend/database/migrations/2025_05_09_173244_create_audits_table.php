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
        Schema::create('audits', function (Blueprint $table) {
            $table->uuid("id")->primary();

            // buat action
            $table->enum('action', ['update', 'print', 'delete', 'create']);
            // features yang digunakan
            $table->enum('features', ['task', 'sub_task', 'project']);

            // notes
            $table->text("notes");
            
            // buat master id ke uuid
            $table->uuid("master_id");

            // name creator
            $table->string("creator_name");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audits');
    }
};
