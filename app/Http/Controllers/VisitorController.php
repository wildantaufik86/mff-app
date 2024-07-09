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
use Intervention\Image\Laravel\Facades\Image;
use Intervention\Image\Typography\FontFactory;

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
        dd($datas);
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
        $visitor = new Visitor($data);

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

    public function exportInvitation(Request $request)
    {
        $id = $request->get('id');

        if ($id) {
            $visitor = Visitor::findOrFail($id);
        } else {
            return response()->json(['error' => 'No ID provided'], 400);
        }
        $image = Image::read(public_path("/images/bg-ticket.png"));
        $logo1 = Image::read(public_path("/images/logo-pemko.png"));
        $logo1->scaleDown(height: 80);
        $image->place($logo1, 'top-left', offset_x: 30, offset_y: 50);

        $logo2 = Image::read(public_path("/images/logo-kolaborasi.png"));
        $logo2->scaleDown(height: 80);
        $image->place($logo2, 'top-right', offset_x: 30, offset_y: 50);

        $logo3 = Image::read(public_path("/images/logo-acara.png"));
        $logo3->scaleDown(height: 200);
        $image->place($logo3, 'top', offset_y: 250);

        $image->text('Ny. Kahiyang Ayu M. Bobby Afif Nasution', $image->size()->width() / 2, 650, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(40);
            $font->wrap($image->size()->width() - 50);
            $font->align('center');
        });
        $image->text('KETUA DEKRANASDA KOTA MEDAN', $image->size()->width() / 2, 700, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->color('#505050');
            $font->wrap($image->size()->width() - 50);
            $font->align('center');
        });
        $image->text('MENGUNDANG BAPAK/IBU', $image->size()->width() / 2, 800, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() - 50);
            $font->align('center');
        });
        $image->text($visitor->name, $image->size()->width() / 2, 850, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->color('#505050');
            $font->wrap($image->size()->width() - 50);
            $font->align('center');
        });

        $image->text("Venue", 60, 1000, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() - 50);
            $font->align('left');
        });

        $image->text("Santika Dyandra Convention Hall - SDCH", 60, 1055, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-light.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() / 2 - 50);
            $font->align('left');
            $font->valign('top');
        });

        $image->text("GATE IN", $image->size()->width() - 60, 1000, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->wrap($image->size()->width());
            $font->align('right');
        });

        $image->text($visitor->gate, $image->size()->width() - 60, 1055, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-light.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() / 2 - 50);
            $font->align('right');
            $font->valign('top');
        });

        $image->text("SHOW DATA - TIME", 60, 1250, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() - 50);
            $font->align('left');
        });

        $image->text($visitor->tanggal, 60, 1300, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-light.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() / 2 - 50);
            $font->align('left');
            $font->valign('top');
        });

        $image->text("TICKET TYPE", $image->size()->width() - 60, 1250, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(32);
            $font->wrap($image->size()->width());
            $font->align('right');
        });

        $image->text($visitor->seat, $image->size()->width() - 60, 1300, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-light.otf"));
            $font->size(32);
            $font->wrap($image->size()->width() / 2 - 50);
            $font->align('right');
            $font->valign('top');
        });

        $barcode = Image::read($this->getBase64FromFile($visitor->barcode_image_path));
        $barcode->scale(height: 100);
        $image->place($barcode, 'bottom', offset_y: 560);

        $image->text("E-Ticket ini hanya berlaku untuk satu orang. Tunjukkan tiket ini kepada Panitia & jangan membuat salinan tiket ini. Hanya Salinan pertama yang akan diterima. Siapa pun yang menunjukkan tiket ini dianggap sebagai pemilik tiket", $image->size()->width() / 2, 1530, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(18);
            $font->wrap($image->size()->width() - 120);
            $font->align('center');
            $font->valign('top');
        });

        $aa = explode(" ", $visitor->seat);
        $logo4 = Image::read(public_path("/images" . '/' . strtolower($aa[0]) . $aa[1] . '-' . strtolower($aa[3]) . $aa[4] . '.png'));
        $logo4->scaleDown(height: 400);
        $image->place($logo4, 'bottom', offset_y: 50);

        $fileName = $visitor->name . '.png';
        $filePath = storage_path($fileName);

        $image->save($filePath);

        return response()->file($filePath)->deleteFileAfterSend();
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
