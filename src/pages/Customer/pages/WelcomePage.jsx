import { useNavigate, useParams } from 'react-router-dom';
import { UtensilsCrossed, QrCode } from 'lucide-react';

export default function WelcomePage() {
    const navigate = useNavigate();
    const { qr_token } = useParams();

    const tableData = {
        restaurantName: 'Resto YH',
        type: 'Fine Dining Experience',
        tableNumber: 5,
        section: 'Main Area',
        waiter: 'Sarah',
    };

    return (
        <div className="welcome-container">

            <div className="welcome-header">
                <div className="logo-lockup">
                    <div className="logo-icon">
                        <UtensilsCrossed size={16} />
                    </div>
                    <span>{tableData.restaurantName}</span>
                </div>
                <div className="table-badge">
                    <div className="dot"></div>
                    <span>Table {tableData.tableNumber}</span>
                </div>
            </div>

            <div className="welcome-content">

                <div className="qr-icon-wrapper">
                    <div className="qr-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
                    </div>
                    <QrCode size={64} strokeWidth={2.5} />
                </div>

                <div className="welcome-subtitle">QR Code scanned successfully</div>
                <h1 className="welcome-title">Welcome to {tableData.restaurantName}</h1>
                <p className="welcome-desc">{tableData.type}</p>

                <div className="feature-list">
                    {[
                        'Browse our full menu & order directly',
                        'Real-time order tracking',
                        'Pay at the table when you\'re ready'
                    ].map((feature, i) => (
                        <div key={i} className="feature-card">{feature}</div>
                    ))}
                </div>

                <button
                    onClick={() => navigate('/menu')}
                    className="btn-primary-large"
                >
                    <UtensilsCrossed size={20} />
                    View Menu
                </button>

            </div>
        </div>
    );
}
