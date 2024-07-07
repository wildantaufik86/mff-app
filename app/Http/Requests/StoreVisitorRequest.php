<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVisitorRequest extends FormRequest
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
            'instansi' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('visitors')->ignore($this->route('visitor')->id ?? null)],
            'seat' => ['required', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:255'],
            'venue' => ['nullable', 'string', 'max:255'],
            'tanggal' => ['required', 'date'],
            'barcode_code' => ['nullable', 'string', 'max:255'],
            'barcode_image_path' => ['nullable', 'string', 'max:255'],
            'jam_mulai' => ['nullable', 'date_format:H:i'],
            'jam_selesai' => ['nullable', 'date_format:H:i'],
            'invitation' => ['nullable', 'max:255', 'string'],
            'group_status' => ['boolean'],
            'group_person' => ['array', 'required_if:group_status,true'],
            'group_person.*' => ['required', 'string', 'max:255'],
        ];
    }
}
