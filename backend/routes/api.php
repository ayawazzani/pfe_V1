<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\PublicMenuController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\DashboardController;

// =========================
// PUBLIC ROUTES
// =========================

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/public/menu/{table}', [PublicMenuController::class, 'show']);
Route::post('/orders', [OrderController::class, 'store']);

// =========================
// AUTH ROUTES
// =========================

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);


    // =========================
    // ADMIN ROUTES
    // =========================

    Route::middleware('role:admin')->group(function () {

        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('products', ProductController::class);
        Route::apiResource('tables', TableController::class);

        Route::patch('/tables/{id}/status', [TableController::class, 'changeStatus']);

        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    });


    // =========================
    // KITCHEN ROUTES
    // =========================

    Route::middleware('role:kitchen')->group(function () {

        Route::get('/orders', [OrderController::class, 'index']);

        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
        Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus']);

    });


    // =========================
    // WAITER ROUTES
    // =========================

    Route::middleware('role:admin,waiter')->group(function () {

        //Route::post('/orders', [OrderController::class, 'store']);

        Route::post('/payments', [PaymentController::class, 'store']);

    });


    // =========================
    // ADMIN + WAITER
    // =========================

    Route::middleware('role:admin,waiter')->group(function () {

        Route::get('/orders', [OrderController::class, 'index']);

    });

});