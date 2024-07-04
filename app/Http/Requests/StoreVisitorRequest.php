<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
      'email' => ['required', 'email', 'max:255', 'unique:visitors', 'email'],
      'seat' => ['required', 'string', 'max:255'],
      'status' => ['max:255'],
      'invitation' => ['max:255', 'string'],
      'barcode_id' => ['max:255', 'string']
    ];
  }
}
