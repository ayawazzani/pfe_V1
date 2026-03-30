import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  UtensilsCrossed, BarChart3, ShoppingBag, BookOpen,
  Package, Users, Bell, LogOut, Grid3X3,
} from 'lucide-react';
import Analytics from './Analytics';
import AdminOrders from './AdminOrders';
import MenuManagement from './MenuManagement';
import Inventory from './Inventory';
import Staff from './Staff';
import Tables from './Tables';
import './Admin.css';

const navItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: 5 },
  { id: 'menu', label: 'Menu', icon: BookOpen, badge: null },
  { id: 'tables', label: 'Tables', icon: Grid3X3, badge: null },
  { id: 'inventory', label: 'Inventory', icon: Package, badge: 3 },
  { id: 'staff', label: 'Staff', icon: Users, badge: null },
];

const pageComponents = {
  analytics: Analytics,
  orders: AdminOrders,
  menu: MenuManagement,
  tables: Tables,
  inventory: Inventory,
  staff: Staff,
};

const pageTitles = {
  analytics: 'Analytics',
  orders: 'Orders',
  menu: 'Menu',
  tables: 'Tables',
  inventory: 'Inventory',
  staff: 'Staff',
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('analytics');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const ActiveComponent = pageComponents[activePage];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <UtensilsCrossed />
          </div>
          <div className="sidebar-brand">
            <h2>Resto YH</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
              id={`sidebar-${item.id}`}
            >
              <item.icon />
              <span>{item.label}</span>
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-revenue">
            <span className="revenue-dot" />
            <span>Today's Revenue</span>
            <span className="revenue-amount">$2,340</span>
          </div>
          <div className="sidebar-footer-item" onClick={() => navigate('/login')}>
            <LogOut size={18} />
            <span>Back to Home</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1>{pageTitles[activePage]}</h1>
            <p>Resto YH · Admin Dashboard</p>
          </div>
          <div className="admin-header-right">
            <div className="header-notification" id="admin-notifications">
              <Bell size={20} />
              <div className="header-notification-dot" />
            </div>
            <div className="header-user">
              <div className="header-avatar">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="header-user-name">{user?.name || 'Alex Martin'}</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
