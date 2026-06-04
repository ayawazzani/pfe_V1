<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Table;
use App\Models\Product;

class PublicMenuController extends Controller
{
    public function show(Table $table)
    {
        $products = Product::with('category')
            ->where('status', 'available')
            ->where('stock_quantity', '>', 0)
            ->get();

        return response()->json([
            'table' => [
                'id' => $table->id,
                'name' => $table->name ?? null,
                'number' => $table->number ?? null,
            ],
            'menu' => $products,
        ]);
    }
}