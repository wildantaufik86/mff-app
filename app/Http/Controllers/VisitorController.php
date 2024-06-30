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
  public function update()
  {
  }
  public function edit()
  {
  }
  public function destroy(Visitor $model, $id, $request)
  {
    $visitor = $model->findOrFail($id);

    $visitor = $request->user();
    $visitor->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return back()->with('message', 'Student deleted successfully');
  }
}
