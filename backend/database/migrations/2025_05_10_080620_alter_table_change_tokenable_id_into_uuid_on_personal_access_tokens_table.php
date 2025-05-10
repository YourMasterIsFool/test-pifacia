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
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Ubah tokenable_id menjadi UUID
            $table->dropColumn('tokenable_id');
            $table->uuid('tokenable_id')->index();
        });
    }

    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Kembalikan ke unsignedBigInteger jika perlu rollback
            $table->unsignedBigInteger('tokenable_id')->change();
        });
    }
};
