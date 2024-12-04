<?php

namespace App\Http\Requests\Employer;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'job_title' => ['required', 'string', 'max:255'],
            'industry' => ['required'],
            'job_type' => ['required'],
            'description' => ['required', 'string'],
            'currency' => ['required'],
            'salary_min' => ['required', 'integer'],
            'salary_max' => ['required', 'integer','gte:salary_min'],
            'qualifications' => ['required', 'string'],
            'experience' => ['required', 'string'],
            'languages' => ['required', 'string'],
            'skills' => ['required', 'string'],
            'benefits' => ['required', 'string'],
            'location' => ['required', 'string'],
            'schedule' => ['required', 'string'],
            'vacancies' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'integer'],
        ];
    }
}
