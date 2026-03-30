import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';

const STATUS_STEPS = [
    'placed',
    'accepted',
    'preparing',
    'ready',
    'delivered'
];

const STATUS_LABELS = {
    placed: 'Order Placed',
    accepted: 'Accepted',
    preparing: 'Preparing',
    ready: 'Ready',
    delivered: 'Delivered'
};

export default function OrderTrackingPage() {
    const navigate = useNavigate();
    const { order, updateOrderStatus } = useStore();

    useEffect(() => {
        if (!order) return;
        const currentIdx = STATUS_STEPS.indexOf(order.status);
        if (currentIdx < STATUS_STEPS.length - 1) {
            const timer = setTimeout(() => {
                updateOrderStatus(STATUS_STEPS[currentIdx + 1]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [order, updateOrderStatus]);

    if (!order) {
        return (
            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' }}>
                <h2 style={{ marginBottom: '16px' }}>No Active Order</h2>
                <button
                    onClick={() => navigate('/menu')}
                    style={{ padding: '12px 24px', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '12px', fontWeight: 'bold' }}
                >
                    Browse Menu
                </button>
            </div>
        );
    }

    const currentStepIndex = STATUS_STEPS.indexOf(order.status);
    const isDelivered = order.status === 'delivered';

    return (
        <div className="page-container order-tracking-page">
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
                    <span>Table {order.table}</span>
                </div>
            </div>

            {/* Header */}
            <div className="tracking-header">
                <div>
                    <div className="tracking-meta">{order.id} · Table {order.table}</div>
                    <h1 className="tracking-title">Order Status</h1>
                </div>
                <button className="refresh-btn">
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* Status Message */}
            {isDelivered ? (
                <div className="ot-status-message ot-status-delivered">
                    <span>🍽️ Enjoy your meal! Request the bill when ready.</span>
                </div>
            ) : (
                <div className="ot-status-message ot-status-preparing">
                    <span>⏳ Your order is being prepared. Estimated: 15-20 mins</span>
                </div>
            )}

            {/* Stepper Card */}
            <div className="ot-stepper-card">
                <div className="ot-stepper">
                    {/* Vertical line background */}
                    <div className="ot-stepper-line-bg"></div>
                    {/* Vertical line active fill */}
                    <div
                        className="ot-stepper-line-fill"
                        style={{ height: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                    ></div>

                    {STATUS_STEPS.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step} className={`ot-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                <div className={`ot-step-dot ${isCompleted ? 'completed' : ''}`}>
                                    {isCompleted && <CheckCircle2 size={20} strokeWidth={2.5} />}
                                </div>
                                <div className="ot-step-content">
                                    <span className={`ot-step-label ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                        {STATUS_LABELS[step]}
                                    </span>
                                    <span className="ot-step-status">
                                        {isCompleted && (
                                            <CheckCircle2 size={18} className="ot-check-icon" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Order Items Card */}
            <div className="ot-order-items-card">
                <div className="ot-order-items-header">ORDER ITEMS</div>
                <div className="ot-order-items-list">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="ot-order-item-row">
                            <div className="ot-order-item-left">
                                <span className="ot-item-qty">{item.quantity}×</span>
                                <span className="ot-item-name">
                                    {item.name}
                                    {item.selectedExtras?.length > 0 && (
                                        <span className="ot-item-extras">({item.selectedExtras.join(', ')})</span>
                                    )}
                                </span>
                            </div>
                            <span className="ot-item-price">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="ot-order-total-row">
                        <span>Total</span>
                        <span className="ot-total-price">${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Request Bill Button */}
            {isDelivered && (
                <div className="ot-bill-btn-wrapper">
                    <button
                        onClick={() => navigate('/bill')}
                        className="ot-request-bill-btn"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                        Request Bill
                    </button>
                </div>
            )}
        </div>
    );
}
