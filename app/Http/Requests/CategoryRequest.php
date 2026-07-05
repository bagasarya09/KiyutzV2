<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // halaman admin sudah dilindungi middleware
    }

    public function rules(): array
    {
        // Ambil id kategori saat update (route model binding: {category})
        $id = $this->route('category')?->id;

        return [
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['required', Rule::in(['aktif', 'inaktif'])],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'   => 'Nama kategori wajib diisi.',
            'status.required' => 'Status wajib dipilih.',
            'status.in'       => 'Status harus aktif atau inaktif.',
        ];
    }
}