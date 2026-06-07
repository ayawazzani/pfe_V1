import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import {
  Home, UtensilsCrossed, Clock, AlertTriangle, Check,
  ArrowRight, Bell, LogOut, ChefHat, X
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
  if (mins >= 40) return { label: `${mins}m — critical`, className: 'red' };
  if (mins >= 25) return { label: `${mins}m — urgent`, className: 'orange' };
  if (mins >= 15) return { label: `${mins}m — watch`, className: 'yellow' };
  return null;
}

function progressPct(mins) {
  return Math.min(Math.round((mins / 30) * 100), 100);
}

function progressColor(pct) {
  if (pct >= 80) return '#DC2626';
  if (pct >= 50) return '#F97316';
  return '#16A34A';
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

  const handleClearColumn = (columnOrders) => {
    columnOrders.forEach(order => {
      updateOrderStatus(order.realId, 'cancelled');
    });
  };

  const activeCount = newOrders.length + acceptedOrders.length + preparingOrders.length + readyOrders.length;

  const criticalOrders = orders.filter(o =>
    minutesWaiting(o.createdAt) >= 40 && ['accepted', 'preparing'].includes(o.status)
  );

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="kd-layout">

      {/* Header */}
      <header className="kd-header">
        <div className="kd-header-left">
          <button className="kd-home-btn" onClick={() => navigate('/login')} aria-label="Home">
            <Home size={16} />
          </button>
          <div className="kd-brand">
            <div className="kd-brand-icon">
              <ChefHat size={18} />
            </div>
            <div>
              <div className="kd-brand-name">Kitchen Display</div>
              <div className="kd-brand-sub">Resto YH</div>
            </div>
          </div>
        </div>

        <div className="kd-header-pills">
          <div className="kd-pill kd-pill-active">
            <span className="kd-pill-num">{activeCount}</span> active
          </div>
          <div className="kd-pill kd-pill-prep">16m avg prep</div>
          <div className="kd-pill kd-pill-online">
            <span className="kd-pulse-dot" /> kitchen online
          </div>
        </div>

        <div className="kd-header-right">
          <div className="kd-clock">
            <div className="kd-clock-time">{formatTime(currentTime)}</div>
            <div className="kd-clock-date">{formatDate(currentTime)}</div>
          </div>
          <button className="kd-logout-btn" onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Alert banner */}
      {criticalOrders.length > 0 && (
        <div className="kd-alert">
          <AlertTriangle size={14} />
          {criticalOrders.length} order{criticalOrders.length > 1 ? 's' : ''} waiting 40+ min — immediate attention needed
        </div>
      )}

      {/* Board */}
      <div className="kd-board">

        {/* New */}
        <div className="kd-col">
          <div className="kd-col-header">
            <div className="kd-col-header-left">
              <span className="kd-col-dot" style={{ background: '#F97316' }} />
              New orders
              <span className="kd-col-count">{newOrders.length}</span>
            </div>
            {newOrders.length > 0 && (
              <button className="kd-clear-btn" style={{ color: '#F97316' }} onClick={() => handleClearColumn(newOrders)}>Clear</button>
            )}
          </div>
          <div className="kd-col-cards">
            {newOrders.length === 0 && <div className="kd-empty"><UtensilsCrossed size={20} /><span>No new orders</span></div>}
            {newOrders.map((order, i) => (
              <TicketCard
                key={order.id}
                order={order}
                colorIndex={i}
                showUrgency={false}
                action={
                  <button className="kd-bump kd-bump-accept" onClick={() => updateOrderStatus(order.realId, 'accepted')}>
                    Bump — accept <ArrowRight size={13} />
                  </button>
                }
                onCancel={() => updateOrderStatus(order.realId, 'cancelled')}
              />
            ))}
          </div>
        </div>

        {/* Accepted */}
        <div className="kd-col">
          <div className="kd-col-header">
            <div className="kd-col-header-left">
              <span className="kd-col-dot" style={{ background: '#CA8A04' }} />
              Accepted
              <span className="kd-col-count">{acceptedOrders.length}</span>
            </div>
            {acceptedOrders.length > 0 && (
              <button className="kd-clear-btn" style={{ color: '#CA8A04' }} onClick={() => handleClearColumn(acceptedOrders)}>Clear</button>
            )}
          </div>
          <div className="kd-col-cards">
            {acceptedOrders.length === 0 && <div className="kd-empty"><Clock size={20} /><span>Nothing accepted</span></div>}
            {acceptedOrders.map((order, i) => (
              <TicketCard
                key={order.id}
                order={order}
                colorIndex={i + 1}
                showUrgency
                action={
                  <button className="kd-bump kd-bump-start" onClick={() => updateOrderStatus(order.realId, 'preparing')}>
                    Bump — prep <ArrowRight size={13} />
                  </button>
                }
                onCancel={() => updateOrderStatus(order.realId, 'cancelled')}
              />
            ))}
          </div>
        </div>

        {/* Preparing */}
        <div className="kd-col">
          <div className="kd-col-header">
            <div className="kd-col-header-left">
              <span className="kd-col-dot" style={{ background: '#2563EB' }} />
              Preparing
              <span className="kd-col-count">{preparingOrders.length}</span>
            </div>
            {preparingOrders.length > 0 && (
              <button className="kd-clear-btn" style={{ color: '#2563EB' }} onClick={() => handleClearColumn(preparingOrders)}>Clear</button>
            )}
          </div>
          <div className="kd-col-cards">
            {preparingOrders.length === 0 && <div className="kd-empty"><ChefHat size={20} /><span>Nothing cooking</span></div>}
            {preparingOrders.map((order, i) => (
              <TicketCard
                key={order.id}
                order={order}
                colorIndex={i + 2}
                showUrgency
                action={
                  <button className="kd-bump kd-bump-ready" onClick={() => updateOrderStatus(order.realId, 'ready')}>
                    Bump — ready <ArrowRight size={13} />
                  </button>
                }
                onCancel={() => updateOrderStatus(order.realId, 'cancelled')}
              />
            ))}
          </div>
        </div>

        {/* Ready */}
        <div className="kd-col">
          <div className="kd-col-header">
            <div className="kd-col-header-left">
              <span className="kd-col-dot" style={{ background: '#16A34A' }} />
              Ready
              <span className="kd-col-count">{readyOrders.length}</span>
            </div>
            {readyOrders.length > 0 && (
              <button className="kd-clear-btn" style={{ color: '#16A34A' }} onClick={() => handleClearColumn(readyOrders)}>Clear</button>
            )}
          </div>
          <div className="kd-col-cards">
            {readyOrders.length === 0 && <div className="kd-empty"><Bell size={20} /><span>Nothing ready yet</span></div>}
            {readyOrders.map((order, i) => (
              <TicketCard
                key={order.id}
                order={order}
                colorIndex={i + 3}
                showUrgency
                onCancel={() => updateOrderStatus(order.realId, 'cancelled')}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Done Today — full-width centered section */}
      <div className="kd-done-section">
        <div className="kd-done-inner">
          <div className="kd-done-header">
            <div className="kd-done-header-left">
              <Check size={14} />
              Done today
              <span className="kd-col-count">{completedOrders.length}</span>
            </div>
            {completedOrders.length > 0 && (
              <button className="kd-clear-btn" style={{ color: '#6B7280' }} onClick={() => handleClearColumn(completedOrders)}>Clear all</button>
            )}
          </div>
          {completedOrders.length === 0 && (
            <div className="kd-done-empty">No completed orders yet</div>
          )}
          <div className="kd-done-grid">
            {completedOrders.map((order) => (
              <div className="kd-done-item" key={order.id}>
                <span className="kd-done-id">{order.id}</span>
                <span className="kd-done-table">Table {order.tableNumber}</span>
                <span className={`kd-done-badge kd-done-badge-${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="kd-footer">
        <div className="kd-footer-stats">
          <div className="kd-fstat"><span className="kd-fdot" style={{ background: '#F97316' }} /><b>{newOrders.length}</b> new</div>
          <div className="kd-fstat"><span className="kd-fdot" style={{ background: '#2563EB' }} /><b>{preparingOrders.length}</b> preparing</div>
          <div className="kd-fstat"><span className="kd-fdot" style={{ background: '#16A34A' }} /><b>{readyOrders.length}</b> ready</div>
          <div className="kd-fstat"><span className="kd-fdot" style={{ background: '#9CA3AF' }} /><b>{completedOrders.length}</b> done</div>
        </div>
        <div className="kd-footer-right">
          <Bell size={13} /> Notifications on
        </div>
      </footer>

    </div>
  );
}

const TABLE_COLORS = ['#F97316', '#2563EB', '#16A34A', '#CA8A04'];

function TicketCard({ order, colorIndex, action, showUrgency, onCancel }) {
  const mins = minutesWaiting(order.createdAt);
  const urgency = showUrgency ? getUrgencyLevel(mins) : null;
  const pct = progressPct(mins);

  return (
    <div className="kd-ticket">

      {urgency && (
        <div className={`kd-ticket-urg kd-urg-${urgency.className}`}>
          <AlertTriangle size={11} />
          {urgency.label}
        </div>
      )}

      {/* Progress bar */}
      <div className="kd-ticket-prog">
        <div className="kd-ticket-prog-fill" style={{ width: `${pct}%`, background: progressColor(pct) }} />
      </div>

      {/* Header */}
      <div className="kd-ticket-hdr">
        <span className="kd-ticket-id">{order.id}</span>
        <div className="kd-ticket-meta">
          <span className="kd-ticket-time">
            <Clock size={10} />
            {timeAgo(order.createdAt)}
          </span>
          {onCancel && (
            <button className="kd-ticket-cancel" onClick={onCancel} aria-label={`Cancel order ${order.id}`}>
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="kd-ticket-table">
        <span className="kd-ticket-table-dot" style={{ background: TABLE_COLORS[colorIndex % TABLE_COLORS.length] }} />
        Table {order.tableNumber}
      </div>

      {/* Dashed divider */}
      <div className="kd-ticket-divider" />

      {/* Items */}
      <div className="kd-ticket-items">
        {order.items.map((item, i) => (
          <div className="kd-ticket-item" key={i}>
            <span className="kd-ticket-qty">{item.quantity}×</span>
            <div className="kd-ticket-item-body">
              <div className="kd-ticket-item-name">{item.name}</div>
              {item.options?.map((opt, j) => (
                <div
                  key={j}
                  className={/^(Add|Extra|No)\b/.test(opt) ? 'kd-ticket-mod' : 'kd-ticket-opt'}
                >
                  {opt}
                </div>
              ))}
              {item.notes && <div className="kd-ticket-note">{item.notes}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Perforated tear line */}
      <div className="kd-ticket-perf">
        <span className="kd-perf-circle kd-perf-left" />
        <span className="kd-perf-line" />
        <span className="kd-perf-circle kd-perf-right" />
      </div>

      {/* Action */}
      {action && <div className="kd-ticket-foot">{action}</div>}

    </div>
  );
}