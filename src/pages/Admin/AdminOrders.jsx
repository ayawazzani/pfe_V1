import { useState } from 'react';
import { useOrders } from '../../context/OrdersContext';
import { Search, Eye, RefreshCw } from 'lucide-react';

const statusFilters = ['All', 'New', 'Accepted', 'Preparing', 'Ready', 'Delivered', 'Paid', 'Closed'];

const tableColors = ['#F97316', '#3B82F6', '#22C55E', '#8B5CF6', '#EAB308', '#EF4444', '#14B8A6', '#EC4899', '#6366F1', '#F59E0B'];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function AdminOrders() {
  const { orders } = useOrders();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = orders
    .filter((o) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Closed') return o.status === 'cancelled';
      return o.status === activeFilter.toLowerCase();
    })
    .filter((o) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return o.id.toLowerCase().includes(q) || `table ${o.tableNumber}`.includes(q);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getFilterCount = (filter) => {
    if (filter === 'All') return orders.length;
    if (filter === 'Closed') return orders.filter(o => o.status === 'cancelled').length;
    return orders.filter(o => o.status === filter.toLowerCase()).length;
  };

  return (
    <div>
      {/* Info bar */}
      <div className="orders-info-bar">
        <span className="orders-count">{filtered.length} orders shown</span>
        <div className="orders-search-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search order or table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="orders-search-input"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="orders-filter-bar">
        <div className="orders-filters">
          {statusFilters.map((filter) => {
            const count = getFilterCount(filter);
            return (
              <button
                key={filter}
                className={`orders-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                {count > 0 && <span className="filter-count">({count})</span>}
              </button>
            );
          })}
        </div>
        <button className="orders-refresh-btn" title="Refresh">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Orders Table */}
      <div className="orders-table-card">
        <table className="orders-table-v2">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Table</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id}>
                <td className="order-id-cell">{order.id}</td>
                <td>
                  <div className="table-cell-wrap">
                    <span
                      className="table-num-badge"
                      style={{ background: tableColors[(order.tableNumber - 1) % tableColors.length] }}
                    >
                      {order.tableNumber}
                    </span>
                    Table {order.tableNumber}
                  </div>
                </td>
                <td>{order.items.length} Items</td>
                <td className="order-total-cell">${order.total.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="order-time-cell">{timeAgo(order.createdAt)}</td>
                <td>
                  <button className="order-eye-btn" title="View order">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#9CA3AF' }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
