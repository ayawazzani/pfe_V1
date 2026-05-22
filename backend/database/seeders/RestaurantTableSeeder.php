<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantTableSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Table::create([
            'name' => 'Table 1',
            'seats' => 4,
        ]);

        Table::create([
            'name' => 'Table 2',
            'seats' => 4,
        ]);

        Table::create([
            'name' => 'Table 3',
            'seats' => 6,
        ]);

        Table::create([
            'name' => 'Table 4',
            'seats' => 8,
        ]);
    }
}
