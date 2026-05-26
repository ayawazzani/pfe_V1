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
        

        // Kitchen Chef
        User::create([
            'name' => 'Alex Martin',
            'email' => 'admin@restoyh.com',
            'password' => Hash::make('admin@YH20'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'James Wilson',
            'email' => 'waiter@restoyh.com',
            'password' => Hash::make('waiter@YH20'),
            'role' => 'waiter',
        ]);

        User::create([
            'name' => 'Chef Marie',
            'email' => 'kitchen@restoyh.com',
            'password' => Hash::make('kitchen@YH20'),
            'role' => 'kitchen',
        ]);
    }
}
