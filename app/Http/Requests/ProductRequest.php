<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price'       => ['required', 'numeric', 'min:1'],
            // Gambar wajib saat tambah, opsional saat edit
            'image'       => [$this->isMethod('post') ? 'required' : 'nullable', 'image', 'max:2048'],
            'status'      => ['required', Rule::in(['aktif', 'inaktif'])],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Kategori wajib dipilih.',
            'name.required'        => 'Nama produk wajib diisi.',
            'price.required'       => 'Harga wajib diisi.',
            'price.min'            => 'Harga harus lebih dari 0.',
            'image.required'       => 'Gambar produk wajib diunggah.',
            'image.max'            => 'Ukuran gambar maksimal 2MB.',
        ];
    }
}