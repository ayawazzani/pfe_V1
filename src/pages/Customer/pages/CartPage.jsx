import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function CartPage() {
    const navigate = useNavigate();
    const { cart, updateCartQuantity, removeFromCart, placeOrder, order } = useStore();

    const handleConfirmOrder = () => {
        placeOrder();
        // After calling placeOrder, the store updates and generates an order if successful.
        // However, to safely navigate, we could just navigate to /order/current 
        // and let the tracker fetch the 'latest' order. Let's just go there.
        navigate('/order/current');
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="page-container">
            {/* Top Bar for Cart */}
            <div className="top-navbar" style={{ paddingBottom: '0' }}>
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

            <h1 className="page-title">Your Order</h1>

            {cart.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-gray)' }}>
                    <p>Your cart is empty.</p>
                    <button
                        onClick={() => navigate('/menu')}
                        style={{ marginTop: '16px', color: 'var(--primary-color)', fontWeight: '600', fontSize: '16px' }}
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="cart-items-container">
                        {cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="cart-item">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="cart-img" />
                                ) : (
                                    <div className="cart-img" style={{ backgroundColor: '#E8EBEF' }} />
                                )}

                                <div className="cart-item-details">
                                    <div className="cart-item-header">
                                        <div>
                                            <h3 className="cart-item-name">{item.name}</h3>
                                            {item.selectedExtras?.length > 0 && (
                                                <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '2px' }}>
                                                    Adds: {item.selectedExtras.join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        <button onClick={() => removeFromCart(index)} className="delete-btn">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="cart-item-bottom">
                                        <span className="cart-item-price">${(item.unitPrice * item.quantity).toFixed(2)}</span>

                                        <div className="cart-qty-mini">
                                            <button onClick={() => updateCartQuantity(index, -1)}>
                                                <Minus size={14} strokeWidth={3} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateCartQuantity(index, 1)}>
                                                <Plus size={14} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="summary-card">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="price">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Kitchen Warning */}
                    <div className="kitchen-warning">
                        <p>Orders once confirmed are sent directly to the kitchen. You can request changes by calling your waiter.</p>
                    </div>

                    <div className="checkout-btn-wrapper">
                        <button
                            onClick={handleConfirmOrder}
                            className="checkout-btn"
                        >
                            <div className="checkout-btn-left">Table 5 • {totalItems} items</div>
                            <div className="checkout-btn-center">Confirm Order</div>
                            <ChevronRight size={20} color="#FFE6D1" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
