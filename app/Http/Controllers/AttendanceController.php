<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function checkIn(Request $request)
    {
        $barcode = $request->input('barcode');
        Log::info('Received barcode for check-in: ' . $barcode);

        $request->validate([
            'barcode' => 'required|string',
        ]);

        try {
            // Ensure this search is for the correct field
            $visitor = Visitor::where('barcode_code', $barcode)->firstOrFail();
            Log::info('Visitor found: ', ['visitor' => $visitor]);

            // dd($visitor->name);
            if ($visitor->status === 'Checked In') {
                return Inertia::render('CheckIn/index', [
                    'message' => 'Tamu Sudah Check In, Tiket Invalid',
                    'timeStamp' => $visitor->check_in_time,
                    'visitorName' => $visitor->name,
                ])->with('error', 'Tamu Sudah Check In, Tiket Invalid');
            }

            $visitor->status = 'Checked In';
            if (is_null($visitor->check_in_time)) {
                $visitor->check_in_time = Carbon::now('Asia/Jakarta');
            }
            $visitor->save();

            Log::info('Visitor checked in successfully: ', ['visitor' => $visitor]);
            return Inertia::render('CheckIn/index', [
                'message' => 'Check In Berhasil',
                'visitorName' => $visitor->name,
            ])->with('success', 'Checkin In Berhasil');
        } catch (\Exception $e) {
            Log::error('Check-in error: ' . $e->getMessage());
            return Inertia::render('CheckIn/index', [
                'message' => 'Terdapat Kesalahan, Mungkin data belum terdaftar',
                'error_details' => $e->getMessage()
            ])->with('error', 'Terdapat Kesalahan, Mungkin data belum terdaftar');
        }
    }

    public function checkOut(Request $request)
    {
        $barcode = $request->input('barcode');

        // Add validation
        $request->validate([
            'barcode' => 'required|string',
        ]);

        try {
            // Find visitor by barcode number
            $visitor = Visitor::where('barcode_code', $barcode)->firstOrFail();

            if ($visitor->status !== 'Checked In') {
                return Inertia::render('CheckOut/index', [
                    'message' => 'Pengunjung belum Check In',
                    'visitorName' => $visitor->name,
                ])->with('error', 'Pengunjung belum Check In');
            }

            $visitor->status = 'Checked Out';
            $visitor->check_out_time = Carbon::now('Asia/Jakarta');
            $visitor->save();

            return Inertia::render('CheckOut/index', [
                'message' => 'Check Out Berhasil',
                'visitorName' => $visitor->name,
            ])->with('success', 'Check Out Berhasil');
        } catch (\Exception $e) {
            Log::error('Check-out error: ' . $e->getMessage());
            return Inertia::render('CheckOut/index', [
                'message' => 'Terdapat Kesalahan, Mungkin data belum terdaftar',
                'error_details' => $e->getMessage(),
            ])->with('error', 'Terdapat Kesalahan, Mungkin data belum terdaftar');
        }
    }
}
