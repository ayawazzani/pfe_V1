import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { MOCK_MENU } from './MenuPage';

export default function DishDetailsPage({ dishId, onClose }) {
    const addToCart = useStore(state => state.addToCart);
    const dish = MOCK_MENU.find(d => d.id === dishId);

    // Fallback if dish not found
    if (!dish) return null;

    const [quantity, setQuantity] = useState(1);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [instructions, setInstructions] = useState('');

    const handleToggleExtra = (extraName) => {
        setSelectedExtras(prev =>
            prev.includes(extraName)
                ? prev.filter(e => e !== extraName)
                : [...prev, extraName]
        );
    };

    const calculateTotal = () => {
        let total = dish.price;
        selectedExtras.forEach(extName => {
            const extra = dish.extras?.find(e => e.name === extName);
            if (extra) total += extra.price;
        });
        return (total * quantity).toFixed(2);
    };

    const handleAddToOrder = () => {
        // Calculate unit price including extras
        let unitPrice = dish.price;
        selectedExtras.forEach(extName => {
            const extra = dish.extras?.find(e => e.name === extName);
            if (extra) unitPrice += extra.price;
        });

        addToCart({
            id: dish.id,
            name: dish.name,
            quantity: quantity,
            unitPrice: unitPrice, // base + extras
            price: unitPrice * quantity,
            image: dish.image,
            selectedExtras: selectedExtras,
            specialInstructions: instructions
        });
        onClose();
    };

    return (
        <div className="details-overlay" onClick={onClose}>

            <div className="details-modal-container" onClick={e => e.stopPropagation()}>
                {/* Top Image Section */}
                <div className="details-hero">
                    {dish.image ? (
                        <img src={dish.image} alt={dish.name} className="details-img" />
                    ) : (
                        <div className="details-img" style={{ backgroundColor: '#E8EBEF' }} />
                    )}
                    <button
                        onClick={onClose}
                        className="close-btn"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="details-content">

                    <div className="details-header">
                        <h1 className="details-title">{dish.name}</h1>
                        <span className="details-price">${dish.price.toFixed(2)}</span>
                    </div>

                    <p className="details-desc">
                        {dish.description}
                    </p>

                    {/* Extras */}
                    {dish.extras && dish.extras.length > 0 && (
                        <div>
                            <h3 className="section-title">Extras</h3>
                            <div className="extras-grid">
                                {dish.extras.map(extra => (
                                    <button
                                        key={extra.name}
                                        onClick={() => handleToggleExtra(extra.name)}
                                        className={`extra-pill ${selectedExtras.includes(extra.name) ? 'selected' : ''}`}
                                    >
                                        {extra.name} {extra.price > 0 ? `(+$${extra.price.toFixed(2)})` : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Special Instructions */}
                    <div>
                        <h3 className="section-title">Special Instructions</h3>
                        <textarea
                            rows="3"
                            placeholder="No onion, extra sauce, allergies..."
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Bottom Sticky Action Bar */}
                <div className="bottom-action-bar">

                    {/* Quantity Controls */}
                    <div className="qty-control">
                        <button
                            className="qty-btn"
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(q => q - 1)}
                        >
                            <Minus size={18} />
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="qty-btn"
                            onClick={() => setQuantity(q => q + 1)}
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Add to Order Button */}
                    <button
                        className="add-to-order-btn"
                        onClick={handleAddToOrder}
                    >
                        <ShoppingBag size={20} />
                        Add to Order — ${calculateTotal()}
                    </button>
                </div>
            </div>
        </div>
    );
}
