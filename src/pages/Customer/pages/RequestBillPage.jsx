import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function RequestBillPage() {
    const navigate = useNavigate();
    const { order, clearOrder } = useStore();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isPaid, setIsPaid] = useState(false);

    // Normally we'd prevent this, but allow viewing success view if store is wiped for demo
    if (!order && !isPaid) {
        return (
            <div className="page-container" style={{ padding: '20px' }}>
                <h2>No Active Order</h2>
                <button className="checkout-btn" onClick={() => navigate('/menu')} style={{ marginTop: '20px' }}>
                    Go Back
                </button>
            </div>
        );
    }

    const handlePayNow = () => {
        if (!paymentMethod) return;
        setIsPaid(true);
    };

    const handleDone = () => {
        clearOrder();
        navigate('/');
    };

    if (isPaid) {
        return (
            <div className="page-container success-page">
                {/* Top Navbar Variant */}
                <div className="top-navbar" style={{ paddingBottom: '16px', backgroundColor: 'transparent' }}>
                    <div className="logo-lockup">
                        <div className="logo-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
                        </div>
                        <span>Bistro 360</span>
                    </div>
                    <div className="table-badge" style={{ backgroundColor: '#F0F2F5', border: 'none' }}>
                        <div className="dot" style={{ backgroundColor: 'var(--success)' }}></div>
                        <span>Table 5</span>
                    </div>
                </div>

                <div className="success-content">
                    <div className="success-icon-wrapper">
                        <div className="success-icon-inner">
                            <Check size={32} strokeWidth={3} />
                        </div>
                    </div>
                    <h1 className="success-title">Payment Successful!</h1>
                    <p className="success-subtitle">${order.total.toFixed(2)} paid via {paymentMethod === 'card' ? 'Card' : 'Cash'}</p>
                    <p className="success-note">Receipt sent to your email</p>
                </div>

                <div className="success-order-card">
                    <div className="success-row">
                        <span className="label">Order</span>
                        <span className="value">{order.id}</span>
                    </div>
                    <div className="success-row">
                        <span className="label">Table</span>
                        <span className="value">{order.table}</span>
                    </div>
                    <div className="success-row">
                        <span className="label">Status</span>
                        <span className="value highlight">Paid <Check size={14} style={{ marginLeft: 4 }} /></span>
                    </div>
                </div>

                <div className="pay-now-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <button
                        className="pay-now-btn"
                        onClick={handleDone}
                        style={{ justifyContent: 'center' }}
                    >
                        Done
                    </button>
                    <p className="success-footer">Thank you for dining at Bistro 360!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="tracking-header" style={{ marginBottom: '20px' }}>
                <h1 className="tracking-title" style={{ fontSize: '24px', letterSpacing: '-0.5px' }}>Request Bill</h1>
            </div>

            <div className="bill-summary-card">
                <div className="bill-summary-header">
                    BILL SUMMARY · {order.id}
                </div>

                <div className="bill-items-list">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="bill-item-row">
                            <div className="left">
                                <span className="qty">{item.quantity}×</span>
                                <span className="name">{item.name}</span>
                            </div>
                            <span className="price">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="bill-divider"></div>

                    <div className="bill-summary-row">
                        <span>Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="bill-summary-row">
                        <span>Tax & Service (8%)</span>
                        <span>${(order.total - order.subtotal).toFixed(2)}</span>
                    </div>

                    <div className="bill-total-row">
                        <span>Total</span>
                        <span className="price">${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="payment-section-title">PAYMENT METHOD</div>

            <div className="payment-methods-container">
                {/* Cash Option */}
                <div
                    className={`payment-method-card ${paymentMethod === 'cash' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('cash')}
                >
                    <div className="payment-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                    </div>
                    <div className="payment-info">
                        <div className="payment-title">Cash</div>
                        <div className="payment-desc">Pay with cash to your waiter</div>
                    </div>
                    <div className="radio-circle">
                        {paymentMethod === 'cash' && <div className="radio-dot"></div>}
                    </div>
                </div>

                {/* Card Option */}
                <div
                    className={`payment-method-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                >
                    <div className="payment-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                    </div>
                    <div className="payment-info">
                        <div className="payment-title">Card</div>
                        <div className="payment-desc">Visa, Mastercard, Apple Pay</div>
                    </div>
                    <div className="radio-circle">
                        {paymentMethod === 'card' && <div className="radio-dot"></div>}
                    </div>
                </div>
            </div>

            <div className="pay-now-wrapper">
                <button
                    className="pay-now-btn"
                    disabled={!paymentMethod}
                    onClick={handlePayNow}
                >
                    <span>${order.total.toFixed(2)}</span>
                    <span className="center-text">Pay Now</span>
                    <ChevronRight size={20} />
                </button>
            </div>

        </div>
    );
}
