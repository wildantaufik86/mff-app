<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorRequest;
use App\Mail\InvitationMail;
use App\Models\barcode;
use App\Models\Visitor;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
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
  public function create()
  {
    return Inertia::render("Registrasi/Create");
  }

  public function store(StoreVisitorRequest $request)
  {
    $data = $request->validated();
    DB::beginTransaction();

    try {
      // Create the visitor
      $visitor = Visitor::create($data);

      // Create the barcode and associate it with the visitor
      $barcode = barcode::create([
        'code' => barcode::generateUniqueCode(),
        'visitor_id' => $visitor->id,
      ]);

      // Update the visitor with the barcode_id
      $visitor->update(['barcode_id' => $barcode->id]);

      DB::commit();

      return redirect()->route('dashboard')->with('success', 'Visitor created successfully.');
    } catch (\Exception $e) {
      DB::rollBack();
      return redirect()->back()->with('error', 'An error occurred while creating the visitor and barcode.');
    }
  }

  public function show(Visitor $visitor)
  {
    return Inertia::render('Visitors/Show', compact('visitor'));
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

  public function sendInvitation(Visitor $visitor)
  {
    $details = [
      'title' => 'Invitation to ' . $visitor->name,
      'body' => 'You are invited to our event.'
    ];

    Mail::to($visitor->email)->send(new InvitationMail($details));

    $visitor->update(['invitation' => 'sent']);

    return redirect()->route('visitors.index');
  }

  public function destroy($id, Request $request)
  {
    $visitor = Visitor::findOrFail($id);
    $visitor->delete();

    return Redirect::back()->with('msg', 'The Message');
  }
}
