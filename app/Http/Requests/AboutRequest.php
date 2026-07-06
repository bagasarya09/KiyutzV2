<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

   public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quote'       => ['nullable', 'string'],
            'founder'     => ['nullable', 'string', 'max:255'],
            'image'       => ['nullable', 'image', 'max:2048'],
            'image2'      => ['nullable', 'image', 'max:2048'],
        ];
    }
}