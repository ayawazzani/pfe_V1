import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import {
  Home, UtensilsCrossed, Clock, AlertTriangle, Check,
  ArrowRight, Bell, LogOut, ChefHat,
} from 'lucide-react';
import './Kitchen.css';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

function minutesWaiting(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
}

function getUrgencyLevel(mins) {
  if (mins >= 40) return { label: `Urgent — ${mins} min`, className: 'red' };
  if (mins >= 25) return { label: `Urgent — ${mins} min`, className: 'orange' };
  if (mins >= 15) return { label: `Urgent — ${mins} min`, className: 'yellow' };
  return null;
}

export default function KitchenDisplay() {
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const newOrders = orders.filter((o) => o.status === 'new');
  const acceptedOrders = orders.filter((o) => o.status === 'accepted');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const readyOrders = orders.filter((o) => o.status === 'ready');
  const completedOrders = orders.filter((o) => ['delivered', 'paid'].includes(o.status));

  const activeCount = newOrders.length + acceptedOrders.length + preparingOrders.length + readyOrders.length;

  const tableColors = ['green', 'orange', 'blue', 'yellow'];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="kitchen-layout">
      {/* Header */}
      <header className="kitchen-header">
        <div className="kitchen-header-left">
          <div className="kitchen-home-btn" onClick={() => navigate('/login')}>
            <Home size={18} />
          </div>
          <div className="kitchen-brand">
            <div className="kitchen-brand-icon">
              <ChefHat />
            </div>
            <div className="kitchen-brand-info">
              <h2>Kitchen Display</h2>
              <span>Resto YH</span>
            </div>
          </div>
        </div>

        <div className="kitchen-header-right">
          <div className="kitchen-clock">
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>

          <div className="kitchen-header-stats">
            <div className="kitchen-header-stat active">
              <span className="stat-num">{activeCount}</span>
              Active
            </div>
            <div className="kitchen-header-stat prep">
              <span className="stat-num">16m</span>
              Avg Prep
            </div>
            <div className="kitchen-header-stat online">
              Kitchen Online
            </div>
          </div>

          <button className="kitchen-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="kitchen-board">
        {/* New Orders */}
        <div className="kitchen-column">
          <div className="column-header new-order">
            New Order
            <span className="col-count">{newOrders.length}</span>
          </div>
          <div className="column-cards">
            {newOrders.map((order, i) => (
              <KitchenCard
                key={order.id}
                order={order}
                tableColor={tableColors[i % tableColors.length]}
                action={
                  <button
                    className="kitchen-action-btn accept"
                    onClick={() => updateOrderStatus(order.id, 'accepted')}
                  >
                    Accept <ArrowRight size={16} />
                  </button>
                }
              />
            ))}
          </div>
        </div>

        {/* Accepted */}
        <div className="kitchen-column">
          <div className="column-header accepted">
            Accepted
            <span className="col-count">{acceptedOrders.length}</span>
          </div>
          <div className="column-cards">
            {acceptedOrders.map((order, i) => (
              <KitchenCard
                key={order.id}
                order={order}
                tableColor={tableColors[(i + 1) % tableColors.length]}
                showUrgency
                action={
                  <button
                    className="kitchen-action-btn start"
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                  >
                    Start Prep <ArrowRight size={16} />
                  </button>
                }
              />
            ))}
          </div>
        </div>

        {/* Preparing */}
        <div className="kitchen-column">
          <div className="column-header preparing">
            Preparing
            <span className="col-count">{preparingOrders.length}</span>
          </div>
          <div className="column-cards">
            {preparingOrders.map((order, i) => (
              <KitchenCard
                key={order.id}
                order={order}
                tableColor={tableColors[(i + 2) % tableColors.length]}
                showUrgency
                action={
                  <button
                    className="kitchen-action-btn mark-ready"
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                  >
                    Mark Ready <ArrowRight size={16} />
                  </button>
                }
              />
            ))}
          </div>
        </div>

        {/* Ready */}
        <div className="kitchen-column">
          <div className="column-header ready">
            Ready
            <span className="col-count">{readyOrders.length}</span>
          </div>
          <div className="column-cards">
            {readyOrders.map((order, i) => (
              <KitchenCard
                key={order.id}
                order={order}
                tableColor={tableColors[(i + 3) % tableColors.length]}
                showUrgency
              />
            ))}
          </div>
        </div>

        {/* Completed Today */}
        <div className="kitchen-column completed">
          <div className="column-header completed-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={14} />
              Completed Today
            </span>
            <span className="col-count">{completedOrders.length}</span>
          </div>
          <div className="column-cards">
            {completedOrders.map((order) => (
              <div className="completed-item" key={order.id}>
                <span className="completed-item-info">
                  {order.id} · Table {order.tableNumber}
                </span>
                <span className={`completed-item-status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="kitchen-footer">
        <div className="kitchen-footer-left">
          <div className="kitchen-footer-stat">
            <span className="dot blue" />
            <span className="num">{newOrders.length}</span> New
          </div>
          <div className="kitchen-footer-stat">
            <span className="dot orange" />
            <span className="num">{preparingOrders.length}</span> Preparing
          </div>
          <div className="kitchen-footer-stat">
            <span className="dot green" />
            <span className="num">{readyOrders.length}</span> Ready
          </div>
          <div className="kitchen-footer-stat">
            <span className="dot gray" />
            <span className="num">7</span> Today's Covers
          </div>
        </div>
        <div className="kitchen-footer-right">
          <Bell size={14} />
          Notifications on
        </div>
      </footer>
    </div>
  );
}

function KitchenCard({ order, tableColor, action, showUrgency }) {
  const mins = minutesWaiting(order.createdAt);
  const urgency = showUrgency ? getUrgencyLevel(mins) : null;

  return (
    <div className="kitchen-card">
      {urgency && (
        <div className={`kitchen-card-urgent ${urgency.className}`}>
          <AlertTriangle size={12} />
          {urgency.label}
        </div>
      )}
      <div className="kitchen-card-body">
        <div className="kitchen-card-top">
          <span className="kitchen-card-id">{order.id}</span>
          <span className="kitchen-card-time">
            <Clock size={12} />
            {timeAgo(order.createdAt)}
          </span>
        </div>
        <div className={`kitchen-card-table ${tableColor}`}>
          Table {order.tableNumber}
        </div>
        <div className="kitchen-card-items">
          {order.items.map((item, i) => (
            <div className="kitchen-item" key={i}>
              <span className="kitchen-item-qty">{item.quantity}×</span>
              <div className="kitchen-item-details">
                <div className="kitchen-item-name">{item.name}</div>
                {item.options?.map((opt, j) => (
                  <div key={j} className="kitchen-item-option">{opt}</div>
                ))}
                {item.options?.filter(o => o.startsWith('Add') || o.startsWith('Extra') || o.startsWith('No')).map((mod, j) => (
                  <div key={`mod-${j}`} className="kitchen-item-modifier">{mod}</div>
                ))}
                {item.notes && (
                  <div className="kitchen-item-note">{item.notes}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        {action}
      </div>
    </div>
  );
}
