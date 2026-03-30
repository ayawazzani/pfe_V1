import { useState } from 'react';
import { Search, Star, Clock, Plus } from 'lucide-react';
import DishDetailsPage from './DishDetailsPage';


const MOCK_CATEGORIES = ['All', 'Starters', 'Mains', 'Drinks', 'Desserts'];

export const MOCK_MENU = [
    {
        id: 1,
        name: 'Classic Bruschetta',
        description: 'Toasted bread with fresh tomatoes, basil, and garlic drizzle.',
        price: 8.50,
        rating: 4.8,
        time: '8m',
        image: 'https://images.unsplash.com/photo-1531634855007-e1a56a2bc193?auto=format&fit=crop&q=80&w=200',
        category: 'Starters',
        extras: [
            { name: 'Extra Cheese', price: 1.50 },
            { name: 'Add Avocado', price: 2.00 },
            { name: 'Extra Basil', price: 0.50 }
        ]
    },
    {
        id: 2,
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing, croutons, and shaved parmesan.',
        price: 10.00,
        rating: 4.8,
        time: '10m',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=200',
        category: 'Starters',
        extras: [{ name: 'Add Grilled Chicken', price: 4.00 }]
    },
    {
        id: 3,
        name: 'Tomato Bisque',
        description: 'Creamy roasted tomato soup with herb cream and sourdough croutons.',
        price: 7.00,
        rating: 4.8,
        time: '10m',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=200',
        category: 'Starters',
        extras: [{ name: 'Extra Croutons', price: 0.50 }]
    },
    {
        id: 4,
        name: 'Ribeye Steak',
        description: 'Premium cut ribeye, fire-grilled, served with asparagus and mashed potatoes.',
        price: 32.00,
        rating: 4.9,
        time: '25m',
        image: 'https://images.unsplash.com/photo-1544025162-831e51b66df8?auto=format&fit=crop&q=80&w=200',
        category: 'Mains',
        extras: [{ name: 'Peppercorn Sauce', price: 2.50 }, { name: 'Garlic Butter', price: 1.50 }]
    },
    {
        id: 5,
        name: 'Espresso Coffee',
        description: 'Rich espresso made from freshly ground premium single-origin beans.',
        price: 4.50,
        rating: 4.7,
        time: '3m',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200',
        category: 'Drinks',
        extras: [{ name: 'Almond Milk', price: 0.50 }, { name: 'Oat Milk', price: 0.50 }]
    }
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDish, setSelectedDish] = useState(null);

    const filteredMenu = MOCK_MENU.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="menu-page">

            {/* Top Bar */}
            <div className="top-navbar">
                <div className="logo-lockup">
                    <div className="logo-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
                    </div>
                    <span>Resto YH</span>
                </div>
                <div className="table-badge">
                    <div className="dot"></div>
                    <span>Table 5</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <div className="search-input-wrapper">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Category Pills */}
            <div className="category-scroll">
                {MOCK_CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Menu List */}
            <div className="menu-list">
                {filteredMenu.map(dish => (
                    <div
                        key={dish.id}
                        className="dish-card"
                        onClick={() => {
                            setSelectedDish(dish.id);
                        }}
                    >
                        <div className="dish-info">
                            <h3 className="dish-name">{dish.name}</h3>
                            <p className="dish-desc">{dish.description}</p>

                            <div className="dish-price-row">
                                <div className="dish-price">${dish.price.toFixed(2)}</div>
                                <div className="dish-meta">
                                    <div className="meta-item meta-star">
                                        <Star size={14} />
                                        <span>{dish.rating}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Clock size={14} />
                                        <span>{dish.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dish-image-wrapper">
                            {dish.image ? (
                                <img src={dish.image} alt={dish.name} className="dish-image" />
                            ) : (
                                <div className="dish-image"></div>
                            )}
                            <button
                                className="add-btn-small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDish(dish.id);
                                }}
                            >
                                <Plus size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMenu.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                        No dishes found matching your criteria.
                    </div>
                )}
            </div>

            {/* Dish Details Modal */}
            {selectedDish && (
                <DishDetailsPage
                    dishId={selectedDish}
                    onClose={() => setSelectedDish(null)}
                />
            )}

        </div>
    );
}
