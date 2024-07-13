<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorRequest;
use App\Mail\InvitationMail;
use App\Models\Visitor;
use App\Models\VisitorGroup;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $datas = Visitor::orderBy('tanggal', 'desc')->get()->map(function ($visitor) {
            $visitor->barcode_image_path = $this->getBase64FromFile($visitor->barcode_image_path);
            return $visitor;
        });
        $visitorsSum = $this->visitorsSum();
        return Inertia::render('Dashboard', [
            'auth' => auth()->user(),
            'datas' => $datas,
            'visitorsSum' => $visitorsSum,
        ]);
    }

    public function count()
    {
        $sum = $this->sum();
        $sum11 = $this->sum11();
        $sum12 = $this->sum12();
        $sum13 = $this->sum13();
        // dd($sum);
        return Inertia::render('Count/index', [
            'auth' => auth()->user(),
            'sum' => $sum,
            'sum11' => $sum11,
            'sum12' => $sum12,
            'sum13' => $sum13,
        ]);
    }

    public function sum()
    {
        $sections = ['A', 'B', 'C', 'D'];
        $rows = [1, 2, 3];
        $seatCount = [];

        $visitorTotal = Visitor::count();
        $visitorCheckIn = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->count();
        $gateAB = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('gate', 'A - B')->count();
        $gateCD = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('gate', 'C - D')->count();
        foreach ($sections as $section) {
            foreach ($rows as $row) {
                $seat = "SECTION $section - ROW $row";
                $seatCount[$seat] = DB::table('visitors')
                    ->where('status', '=', 'Checked In')
                    ->where('seat', $seat)
                    ->count();
            }
        }
        return [
            'totalVisitor' => $visitorTotal,
            'checkInTotal' => $visitorCheckIn,
            'gateAB' => $gateAB,
            'gateCD' => $gateCD,
            'seatCount' => $seatCount,
        ];
    }

    public function sum11()
    {
        $sections = ['A', 'B', 'C', 'D'];
        $rows = [1, 2, 3];
        $seatCount = [];

        $visitorTotal = Visitor::count();
        $visitorCheckIn = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '11/Jul/2024 17:00 - END')->count();
        $gateAB = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '11/Jul/2024 17:00 - END')->where('gate', 'A - B')->count();
        $gateCD = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '11/Jul/2024 17:00 - END')->where('gate', 'C - D')->count();
        foreach ($sections as $section) {
            foreach ($rows as $row) {
                $seat = "SECTION $section - ROW $row";
                $seatCount[$seat] = DB::table('visitors')
                    ->where('status', '=', 'Checked In')
                    ->where('tanggal', '11/Jul/2024 17:00 - END')
                    ->where('seat', $seat)
                    ->count();
            }
        }
        return [
            'totalVisitor' => $visitorTotal,
            'checkInTotal' => $visitorCheckIn,
            'gateAB' => $gateAB,
            'gateCD' => $gateCD,
            'seatCount' => $seatCount,
        ];
    }
    public function sum12()
    {
        $sections = ['A', 'B', 'C', 'D'];
        $rows = [1, 2, 3];
        $seatCount = [];

        $visitorTotal = Visitor::count();
        $visitorCheckIn = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '12/Jul/2024 17:00 - END')->count();
        $gateAB = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '12/Jul/2024 17:00 - END')->where('gate', 'A - B')->count();
        $gateCD = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '12/Jul/2024 17:00 - END')->where('gate', 'C - D')->count();
        foreach ($sections as $section) {
            foreach ($rows as $row) {
                $seat = "SECTION $section - ROW $row";
                $seatCount[$seat] = DB::table('visitors')
                    ->where('status', '=', 'Checked In')
                    ->where('tanggal', '12/Jul/2024 17:00 - END')
                    ->where('seat', $seat)
                    ->count();
            }
        }
        return [
            'totalVisitor' => $visitorTotal,
            'checkInTotal' => $visitorCheckIn,
            'gateAB' => $gateAB,
            'gateCD' => $gateCD,
            'seatCount' => $seatCount,
        ];
    }
    public function sum13()
    {
        $sections = ['A', 'B', 'C', 'D'];
        $rows = [1, 2, 3];
        $seatCount = [];

        $visitorTotal = Visitor::count();
        $visitorCheckIn = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '13/Jul/2024 17:00 - END')->count();
        $gateAB = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '13/Jul/2024 17:00 - END')->where('gate', 'A - B')->count();
        $gateCD = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('tanggal', '13/Jul/2024 17:00 - END')->where('gate', 'C - D')->count();
        foreach ($sections as $section) {
            foreach ($rows as $row) {
                $seat = "SECTION $section - ROW $row";
                $seatCount[$seat] = DB::table('visitors')
                    ->where('status', '=', 'Checked In')
                    ->where('tanggal', '13/Jul/2024 17:00 - END')
                    ->where('seat', $seat)
                    ->count();
            }
        }
        return [
            'totalVisitor' => $visitorTotal,
            'checkInTotal' => $visitorCheckIn,
            'gateAB' => $gateAB,
            'gateCD' => $gateCD,
            'seatCount' => $seatCount,
        ];
    }

    public function visitorsSum()
    {
        $visitorTotal = Visitor::count();
        // $visitorCheckIn = Visitor::where('status', 'Checked In')->count();
        // $gateAB = DB::table('visitors')->where('visitors.status', '=', 'Checked In')->where('gate', 'A - B')->count();
        $visitorCheckIn = DB::table('visitors')->where('status', 'Checked In')->where('check_in_time', '>=', Carbon::now()->startOf('day')->toDateTimeString())->where('check_in_time', '<=', Carbon::now()->endOf('day')->toDateTimeString())->count();
        return [
            'totalVisitor' => $visitorTotal,
            'checkInTotal' => $visitorCheckIn,
            // 'gateAB' => $gateAB
        ];
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
        // Periksa apakah nilai barcode telah diberikan dalam form input
        if (empty($data['barcode_code'])) {
            $number = mt_rand(1000000000, 9999999999);
            $data['barcode_code'] = $number;
        } else {
            $number = $data['barcode_code'];
        }

        // Generate barcode image
        $barcode = new DNS1D();
        $barcode->setStorPath(storage_path('app/public/barcodes/')); // Set storage path

        // Generate barcode PNG and save to storage
        $barcodeData = $barcode->getBarcodePNG($number, 'C39', 1, 40);
        $fileName = $number . '.jpg';
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

        $logo2 = Image::read(public_path("/images/logo-dekranass.png"));
        $logo2->scaleDown(height: 80);
        $image->place($logo2, 'top-right', offset_x: 270, offset_y: 50);

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

        $image->text("E-Ticket ini berlaku untuk satu orang dan berumur 17 tahun ke atas.", $image->size()->width() / 2, 1530, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(13);
            $font->wrap($image->size()->width() - 120);
            $font->align('center');
            $font->valign('top');
        });

        $image->text("Tunjukkan ticket ini kepada Panitia & jangan membuat salinan dari ticket ini. Hanya salinan pertama yang akan diterima.", $image->size()->width() / 2, 1550, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(13);
            $font->wrap($image->size()->width() - 100);
            $font->align('center');
            $font->valign('top');
        });

        $image->text("Siapapun yang menunjukkan ticket ini dianggap sebagai pemilik ticket.", $image->size()->width() / 2, 1570, function (FontFactory $font) use ($image) {
            $font->filename(public_path("/fonts/gilroy-bold.otf"));
            $font->size(13);
            $font->wrap($image->size()->width() - 100);
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
            'tanggal' => 'required|max:255|min:2',
            'gate' => 'required|max:255|min:2',
            'status' => 'required|max:255|min:2',
            'seat' => 'required|max:255|min:2',
            // 'email' => 'required|email|max:255|unique:visitors,email,' . $id,
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
