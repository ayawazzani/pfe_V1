import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import { Home, CheckCircle, LogOut } from 'lucide-react';
import './Waiter.css';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

function minutesWaiting(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / 60000);
}

export default function WaiterDashboard() {
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus, getActiveOrders, getReadyOrders, getDeliveredOrders } = useOrders();
  const navigate = useNavigate();

  const activeOrders = getActiveOrders();
  const readyOrders = getReadyOrders();
  const deliveredOrders = getDeliveredOrders();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeliver = (orderId) => {
    updateOrderStatus(orderId, 'delivered');
  };

  const statusColors = {
    new: { bg: '#DBEAFE', color: '#3B82F6' },
    accepted: { bg: '#FEF9C3', color: '#B45309' },
    preparing: { bg: '#FFEDD5', color: '#F97316' },
    ready: { bg: '#DCFCE7', color: '#22C55E' },
    delivered: { bg: '#CCFBF1', color: '#14B8A6' },
  };

  return (
    <div className="waiter-layout">
      {/* Header */}
      <header className="waiter-header">
        <div className="waiter-header-left">
          <div className="waiter-home-btn" onClick={() => navigate('/login')}>
            <Home size={18} />
          </div>
          <div className="waiter-brand">
            <div className="waiter-brand-avatar">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'JW'}
            </div>
            <div className="waiter-brand-info">
              <h2>Waiter Dashboard</h2>
              <span>Resto YH · {user?.name || 'James'}</span>
            </div>
          </div>
        </div>
        <div className="waiter-header-right">
          <div className="waiter-badge">
            {readyOrders.length} ready to deliver
          </div>
          <button className="waiter-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="waiter-stats">
        <div className="waiter-stat">
          <h3>{activeOrders.length}</h3>
          <p>Active Orders</p>
        </div>
        <div className="waiter-stat">
          <h3>{readyOrders.length}</h3>
          <p>Ready to Serve</p>
        </div>
        <div className="waiter-stat">
          <h3>{deliveredOrders.length}</h3>
          <p>Delivered Today</p>
        </div>
        <div className="waiter-stat">
          <h3>2.4m</h3>
          <p>Avg Delivery</p>
        </div>
      </div>

      {/* Content */}
      <div className="waiter-content">
        {/* Ready for Delivery */}
        <div>
          <div className="waiter-section-header green">
            <h3>Ready for Delivery</h3>
            <span className="count">{readyOrders.length}</span>
          </div>
          <div className="ready-cards">
            {readyOrders.length === 0 && (
              <div className="chart-card" style={{ textAlign: 'center', padding: 40, color: '#9CA3AF' }}>
                No orders ready for delivery
              </div>
            )}
            {readyOrders.map((order) => (
              <div className="ready-card" key={order.id}>
                <div className="ready-card-header">
                  <span className="label">
                    <CheckCircle size={14} />
                    Ready to Deliver
                  </span>
                  <span className="wait-time">{minutesWaiting(order.createdAt)}m waiting</span>
                </div>
                <div className="ready-card-body">
                  <div className="order-id-row">
                    <span className="order-id">{order.id}</span>
                    <span className="order-total">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="table-num">Table {order.tableNumber}</div>
                  <div className="ready-card-items">
                    {order.items.map((item, i) => (
                      <div className="item" key={i}>
                        <strong>{item.quantity}×</strong> {item.name}
                        {item.options?.length > 0 && (
                          <span className="option">({item.options.join(', ')})</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="deliver-btn"
                    onClick={() => handleDeliver(order.id)}
                    id={`deliver-${order.id}`}
                  >
                    <CheckCircle size={16} />
                    Mark as Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Active Orders */}
        <div>
          <div className="waiter-section-header blue">
            <h3>All Active Orders</h3>
          </div>
          <table className="waiter-active-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Table</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(o => !['paid', 'cancelled'].includes(o.status))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.id}</td>
                    <td>Table {order.tableNumber}</td>
                    <td>
                      <span
                        className={`status-badge ${order.status}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.813rem', color: '#9CA3AF' }}>
                      {timeAgo(order.createdAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Recently Delivered */}
          {deliveredOrders.length > 0 && (
            <div className="recently-delivered">
              <h4>Recently Delivered</h4>
              {deliveredOrders.map((order) => (
                <div className="delivered-item" key={order.id}>
                  <div className="delivered-item-left">
                    <div className="delivered-check">
                      <CheckCircle size={14} />
                    </div>
                    <div className="delivered-item-info">
                      {order.id} · Table {order.tableNumber}
                      <span>Delivered {order.deliveredAt ? timeAgo(order.deliveredAt) : 'recently'}</span>
                    </div>
                  </div>
                  <span className="status-badge delivered">Delivered</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
