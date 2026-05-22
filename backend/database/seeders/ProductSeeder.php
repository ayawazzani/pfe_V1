<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pizza category products
        Product::create([
            'name' => 'Pizza Royale',
            'description' => 'Delicious pizza with premium toppings',
            'price' => 15.99,
            'stock' => 50,
            'category_id' => 1,
        ]);

        Product::create([
            'name' => 'Pizza Margherita',
            'description' => 'Classic pizza with tomato, mozzarella, and basil',
            'price' => 12.99,
            'stock' => 50,
            'category_id' => 1,
        ]);

        Product::create([
            'name' => 'Pizza Quattro Formaggi',
            'description' => 'Pizza with four different cheeses',
            'price' => 14.99,
            'stock' => 40,
            'category_id' => 1,
        ]);

        // Drinks category products
        Product::create([
            'name' => 'Coca Cola',
            'description' => 'Fresh Coca Cola 330ml',
            'price' => 2.50,
            'stock' => 100,
            'category_id' => 2,
        ]);

        Product::create([
            'name' => 'Orange Juice',
            'description' => 'Fresh orange juice',
            'price' => 3.00,
            'stock' => 80,
            'category_id' => 2,
        ]);

        Product::create([
            'name' => 'Sprite',
            'description' => 'Crisp lemon-lime flavored drink',
            'price' => 2.50,
            'stock' => 90,
            'category_id' => 2,
        ]);

        // Desserts category products
        Product::create([
            'name' => 'Tiramisu',
            'description' => 'Traditional Italian dessert',
            'price' => 6.99,
            'stock' => 30,
            'category_id' => 3,
        ]);

        Product::create([
            'name' => 'Chocolate Cake',
            'description' => 'Rich and moist chocolate cake',
            'price' => 5.99,
            'stock' => 25,
            'category_id' => 3,
        ]);

        Product::create([
            'name' => 'Panna Cotta',
            'description' => 'Smooth Italian cream dessert',
            'price' => 7.99,
            'stock' => 20,
            'category_id' => 3,
        ]);
    }
}
