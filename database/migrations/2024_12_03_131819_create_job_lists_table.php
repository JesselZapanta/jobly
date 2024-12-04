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
        Schema::create('job_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained('employers')->onDelete('cascade');
            $table->string('job_title');
            $table->string('industry');
            $table->string('job_type');
            $table->text('description');
            $table->string('currency');
            $table->integer('salary_min');
            $table->integer('salary_max');
            $table->text('qualifications');
            $table->text('experience');
            $table->text('languages');
            $table->text('skills');
            $table->text('benefits');
            $table->string('location');
            $table->string('schedule');
            $table->integer('vacancies');
            $table->tinyInteger('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_lists');
    }
};
