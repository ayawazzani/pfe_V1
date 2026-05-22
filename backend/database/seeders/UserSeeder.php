<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Kitchen Chef
        User::create([
            'name' => 'Chef',
            'email' => 'chef@restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'kitchen',
        ]);

        // Waiter
        User::create([
            'name' => 'Serveur',
            'email' => 'waiter@restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'waiter',
        ]);

        // Customer
        User::create([
            'name' => 'Customer',
            'email' => 'customer@restaurant.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);
    }
}
