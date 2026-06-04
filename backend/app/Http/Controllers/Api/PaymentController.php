<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|in:cash,card,mobile,online',
            'status' => 'required|in:pending,completed,failed,refunded',
            'transaction_id' => 'nullable|string',
        ]);

        $payment = Payment::create($request->all());

        if ($payment->status === 'completed') {
            $order = Order::find($payment->order_id);

            if ($order) {
                $order->update([
                    'status' => 'paid',
                ]);

                Http::post('http://127.0.0.1:3001/emit', [
                    'event' => 'order_status_updated',
                    'data' => [
                        'order_id' => $order->id,
                        'status' => $order->status,
                        'table_id' => $order->table_id,
                    ],
                ]);
            }
        }

        return response()->json([
            'message' => 'Payment created successfully',
            'payment' => $payment,
        ], 201);
    }
}