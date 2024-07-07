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

            if ($visitor->status === 'Checked In') {
                return Inertia::render('CheckIn/index', [
                    'message' => 'Visitor already checked in',
                ])->with('error', 'Visitor already checked in');
            }

            $visitor->status = 'Checked In';
            $visitor->check_in_time = Carbon::now('Asia/Jakarta');
            $visitor->save();
            Log::info('Visitor checked in successfully: ', ['visitor' => $visitor]);

            return Inertia::render('CheckIn/index', [
                'message' => 'Check-in successful',
                'visitor' => $visitor,
            ])->with('success', 'Check-in successful');
        } catch (\Exception $e) {
            Log::error('Check-in error: ' . $e->getMessage());
            return Inertia::render('CheckIn/index', [
                'message' => 'Error during check-in',
                'error_details' => $e->getMessage(),
            ])->with('error', 'Error during check-in');
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
            $visitor = Visitor::where('barcode_code', 'LIKE', "%$barcode%")->firstOrFail();

            if ($visitor->status !== 'Checked In') {
                return Inertia::render('CheckOut/index', [
                    'message' => 'Visitor not checked in',
                ])->with('error', 'Visitor not checked in');
            }

            $visitor->status = 'Checked Out';
            $visitor->check_out_time = Carbon::now('Asia/Jakarta');
            $visitor->save();

            return Inertia::render('CheckOut/index', [
                'message' => 'Check-out successful',
                'visitor' => $visitor,
            ])->with('success', 'Check-out successful');
        } catch (\Exception $e) {
            Log::error('Check-out error: ' . $e->getMessage());
            return Inertia::render('CheckOut/index', [
                'message' => 'Error during check-out',
                'error_details' => $e->getMessage(),
            ])->with('error', 'Error during check-out');
        }
    }
}
