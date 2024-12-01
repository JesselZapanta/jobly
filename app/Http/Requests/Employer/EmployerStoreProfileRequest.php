<?php

namespace App\Http\Requests\Employer;

use Illuminate\Foundation\Http\FormRequest;

class EmployerStoreProfileRequest extends FormRequest
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
            'company_name'=> ['required', 'string', 'max:255'],
            'contact'=> ['required', 'integer'],
            'website'=> ['nullable', 'string', 'max:255'],
            'address'=> ['required', 'string', 'max:255'],
            'industry'=> ['required', 'string'],
            'description'=> ['required', 'string'],
];
    }
}
