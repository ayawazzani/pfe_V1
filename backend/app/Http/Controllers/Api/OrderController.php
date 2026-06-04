<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:tables,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($request) {
            $total = 0;

            $order = Order::create([
                'table_id' => $request->table_id,
                'total' => 0,
                'status' => 'new',
            ]);

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                $quantity = $item['quantity'];
                $price = $product->price;
                $subtotal = $price * $quantity;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price,
                    'subtotal' => $subtotal,
                ]);

                $total += $subtotal;
            }

            $order->update([
                'total' => $total,
            ]);

            $order->refresh();

            return $order;
        });

        Http::post('http://127.0.0.1:3001/emit', [
            'event' => 'new_order',
            'data' => [
                'order_id' => $order->id,
                'table_id' => $order->table_id,
                'total' => $order->total,
                'status' => $order->status,
            ],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'data' => $order->load('items.product', 'table'),
        ], 201);
    }

    public function index()
    {
        $orders = Order::with('items.product', 'table')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Orders fetched successfully',
            'data' => $orders,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:new,accepted,preparing,ready,delivered,paid,closed,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        $event = match ($order->status) {
            'ready' => 'order_ready',
            'delivered' => 'order_delivered',
            default => null,
        };

        if ($event) {
            Http::post('http://127.0.0.1:3001/emit', [
                'event' => $event,
                'data' => [
                    'order_id' => $order->id,
                    'status' => $order->status,
                ],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully',
            'data' => $order->load('items.product', 'table'),
        ]);
    }
}