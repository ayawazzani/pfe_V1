<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class TableController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Tables retrieved successfully',
            'data' => Table::latest()->get()
        ]);
    }

   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'status' => 'nullable|in:free,occupied',
    ]);

    $table = Table::create([
        'name' => $request->name,
        'status' => $request->status ?? 'free',
    ]);

    // QR URL
    $qrUrl = 'http://127.0.0.1:5173/menu?table_id=' . $table->id;

    // Generate QR image
    $qrImage = QrCode::format('svg')
        ->size(300)
        ->generate($qrUrl);

    $fileName = 'qrcodes/table-' . $table->id . '.svg';

    // Save image
    Storage::disk('public')->put($fileName, $qrImage);

    // Save paths
    $table->qr_code = $qrUrl;
    $table->save();

    return response()->json([
        'message' => 'Table created successfully',
        'data' => [
            'id' => $table->id,
            'name' => $table->name,
            'status' => $table->status,
            'qr_code' => $table->qr_code,
            'qr_image' => asset('storage/' . $fileName),
        ]
    ], 201);
}

    public function show(string $id)
    {
        $table = Table::find($id);

        if (!$table) {
            return response()->json([
                'message' => 'Table not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Table retrieved successfully',
            'data' => $table
        ]);
    }

    public function update(Request $request, string $id)
    {
        $table = Table::find($id);

        if (!$table) {
            return response()->json([
                'message' => 'Table not found'
            ], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:free,occupied',
        ]);

        $table->update($request->only(['name', 'status']));

        return response()->json([
            'message' => 'Table updated successfully',
            'data' => $table
        ]);
    }

    public function destroy(string $id)
    {
        $table = Table::find($id);

        if (!$table) {
            return response()->json([
                'message' => 'Table not found'
            ], 404);
        }

        $table->delete();

        return response()->json([
            'message' => 'Table deleted successfully'
        ]);
    }
    public function changeStatus(Request $request, $id)
    {
        $table = Table::find($id);

        if (!$table) {
            return response()->json([
                'message' => 'Table not found'
            ], 404);
        }

        $request->validate([
            'status' => 'required|in:free,occupied'
        ]);

        $table->status = $request->status;
        $table->save();

        return response()->json([
            'message' => 'Table status updated successfully',
            'data' => $table
        ]);
    }
}