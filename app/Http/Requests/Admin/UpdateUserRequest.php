<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UpdateUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required','string','lowercase','email','max:255', Rule::unique('users')->ignore($this->route('id'))],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'integer', Rule::in('1', '0')],
            'status' => ['required', 'integer', Rule::in('1', '0')],
            'avatar' => ['required']
        ];
    }
}
