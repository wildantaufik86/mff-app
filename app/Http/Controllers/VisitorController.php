<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class VisitorController extends Controller
{
  public function index(Request $request)
  {
    $datas = Visitor::all();

    return Inertia::render('Dashboard', [
      'auth' => auth()->user(),
      'datas' => $datas,
    ]);
  }
  public function store(Request $request): RedirectResponse
  {
    $visitor = Visitor::create([
      'name' => $request->name,
      'instansi' => $request->instansi,
      'email' => $request->email,
      'seat' => $request->seat,
      'status' => $request->status
    ]);

    event(new Registered($visitor));

    Auth::login($visitor);

    return Redirect::back()->with('message', 'Test message from server.');
  }
  public function update(Request $request, $id)
  {
    $validatedData = $request->validate([
      'name' => 'required|max:255|min:2',
      'instansi' => 'required|max:255|min:2',
      'status' => 'required|max:255|min:2',
      'email' => 'required|email|max:255|unique:visitors,email,' . $id,
    ], [
      'email.unique' => 'The email has already been taken.',
    ]);

    $visitor = Visitor::findOrFail($id);
    $visitor->update($validatedData);

    return Redirect::back()->with('message', 'Visitor updated successfully');
  }
  public function edit()
  {
  }
  public function destroy($id, Request $request)
  {
    $visitor = Visitor::findOrFail($id);
    $visitor->delete();

    return Redirect::back()->with('msg', 'The Message');
  }
}
