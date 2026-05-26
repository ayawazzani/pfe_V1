<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $ordersCount = Order::count();

        $revenue = Payment::where('status', 'completed')->sum('amount');

        $mostOrderedProducts = OrderItem::with('product:id,name,price')
            ->selectRaw('product_id, SUM(quantity) as total_quantity')
            ->groupBy('product_id')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->get();

        return response()->json([
            'orders_count' => $ordersCount,
            'revenue' => $revenue,
            'most_ordered_products' => $mostOrderedProducts,
        ]);
    }
}