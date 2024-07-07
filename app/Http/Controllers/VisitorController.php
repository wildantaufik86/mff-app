<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorRequest;
use App\Mail\InvitationMail;
use App\Models\Visitor;
use App\Models\VisitorGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Milon\Barcode\DNS1D;

class VisitorController extends Controller
{
    public function index(Request $request)
    {
        $datas = Visitor::all()->map(function ($visitor) {
            $visitor->barcode_image_path = $this->getBase64FromFile($visitor->barcode_image_path);
            return $visitor;
        });

        return Inertia::render('Dashboard', [
            'auth' => auth()->user(),
            'datas' => $datas,
        ]);
    }

    private function getBase64FromFile($filePath)
    {
        if (Storage::exists($filePath)) {
            $content = Storage::get($filePath);
            // Remove any whitespace or newlines
            $content = trim($content);
            // Check if it already has the data URI prefix
            if (strpos($content, 'data:image/png;base64,') !== 0) {
                $content = 'data:image/png;base64,' . $content;
            }
            return $content;
        }
        return null;
    }

    public function create()
    {
        return Inertia::render("Registrasi/Create");
    }

    public function store(StoreVisitorRequest $request)
    {
        $data = $request->validated();
        $number = mt_rand(1000000000, 9999999999);
        $data['barcode_code'] = $number;
        $data['status'] = $data['status'] ?? 'Not Assigned';

        // Generate barcode image
        $barcode = new DNS1D();
        $barcode->setStorPath(storage_path('app/public/barcodes/')); // Set storage path

        // Generate barcode PNG and save to storage
        $barcodeData = $barcode->getBarcodePNG($number, 'C39', 1, 40);
        $fileName = $number . '.png';
        $filePath = 'public/barcodes/' . $fileName;
        Storage::put($filePath, $barcodeData);

        $data['group_status'] = $request->has('group_status') ? $request->group_status : false;

        // Save visitor data with the barcode number
        $visitor = Visitor::create($data);

        // Update visitor with barcode image path
        $visitor->barcode_image_path = $filePath;
        $visitor->save();

        if ($data['group_status']) {
            VisitorGroup::create([
                'visitor_id' => $visitor->id,
                'group_person' => $request->group_person ?? [],
            ]);
        }
        return redirect()->route('dashboard');
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
