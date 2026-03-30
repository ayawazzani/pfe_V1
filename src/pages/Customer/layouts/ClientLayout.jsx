import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, ClipboardList } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ClientLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = useStore(state => state.cart);

    const tabs = [
        { name: 'Menu', path: '/menu', icon: Menu },
        { name: 'Cart', path: '/cart', icon: ShoppingCart },
        { name: 'My Order', path: '/order/current', icon: ClipboardList },
    ];

    return (
        <div className="app-container">
            {/* Main Content Area */}
            <main className="app-content">
                <Outlet />
            </main>

            {/* Bottom Tab Bar */}
            <nav className="bottom-tab-bar">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.path === '/menu'
                        ? location.pathname === '/menu'
                        : tab.path === '/cart'
                            ? location.pathname === '/cart'
                            : location.pathname.startsWith('/order') || location.pathname.startsWith('/bill');
                    return (
                        <button
                            key={tab.name}
                            onClick={() => navigate(tab.path)}
                            className={`tab-btn ${isActive ? 'active' : ''}`}
                        >
                            <div className="tab-icon-wrapper">
                                <Icon size={24} />
                                {/* Cart Badge */}
                                {tab.name === 'Cart' && cart.length > 0 && (
                                    <span className="tab-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                )}
                            </div>
                            <span className="tab-label">{tab.name}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
