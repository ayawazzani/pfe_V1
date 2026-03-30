import { useState } from 'react';
import { inventoryItems as initialInventory } from '../../data/mockData';
import { AlertTriangle, Plus, Minus, RefreshCw } from 'lucide-react';

function getStockStatus(item) {
  const pct = (item.stock / (item.minStock * 2)) * 100;
  if (item.stock <= item.minStock * 0.5) return { status: 'critical', pct: Math.min(pct, 100), color: '#EF4444' };
  if (item.stock <= item.minStock) return { status: 'low', pct: Math.min(pct, 100), color: '#EAB308' };
  return { status: 'ok', pct: Math.min(pct, 100), color: '#22C55E' };
}

export default function Inventory() {
  const [items, setItems] = useState(initialInventory);
  const [activeFilter, setActiveFilter] = useState('All');

  const criticalItems = items.filter((i) => getStockStatus(i).status === 'critical');
  const lowItems = items.filter((i) => getStockStatus(i).status === 'low');
  const okItems = items.filter((i) => getStockStatus(i).status === 'ok');

  const filtered = items.filter((i) => {
    const { status } = getStockStatus(i);
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Low Stock') return status === 'low';
    if (activeFilter === 'Critical') return status === 'critical';
    return true;
  });

  const adjustStock = (id, delta) => {
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, stock: Math.max(0, +(i.stock + delta).toFixed(1)) } : i)
    );
  };

  return (
    <div>
      {/* Alert Banner */}
      {criticalItems.length > 0 && (
        <div className="inventory-alert">
          <div className="inventory-alert-left">
            <AlertTriangle size={18} />
            <div>
              <strong>{criticalItems.length} items at critical stock level</strong>
              <span>{criticalItems.map((i) => i.name).join(', ')}</span>
            </div>
          </div>
          <button className="inventory-alert-btn">Order All</button>
        </div>
      )}

      {/* Stats Row */}
      <div className="inventory-stats-row">
        <div className="inventory-stat-box">
          <span className="inv-stat-num">{items.length}</span>
          <span className="inv-stat-label">Total Items</span>
        </div>
        <div className="inventory-stat-box green">
          <span className="inv-stat-num">{okItems.length}</span>
          <span className="inv-stat-label">Well Stocked</span>
        </div>
        <div className="inventory-stat-box yellow">
          <span className="inv-stat-num">{lowItems.length}</span>
          <span className="inv-stat-label">Low Stock</span>
        </div>
        <div className="inventory-stat-box red">
          <span className="inv-stat-num">{criticalItems.length}</span>
          <span className="inv-stat-label">Critical</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="inventory-filter-bar">
        <div className="inventory-filters">
          {[
            { label: 'All', count: items.length },
            { label: 'Low Stock', count: lowItems.length },
            { label: 'Critical', count: criticalItems.length },
          ].map((f) => (
            <button
              key={f.label}
              className={`inv-filter-btn ${activeFilter === f.label ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.label)}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
        <button className="inv-sync-btn">
          <RefreshCw size={14} />
          Sync
        </button>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-card">
        <table className="inventory-table-v2">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Stock</th>
              <th>Threshold</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const { status, pct, color } = getStockStatus(item);
              return (
                <tr key={item.id} className={status === 'critical' ? 'critical-row' : ''}>
                  <td>
                    <div className="inv-ingredient">
                      <span className={`inv-ingredient-icon ${status}`}>{item.icon}</span>
                      <div>
                        <span className="inv-ingredient-name">{item.name}</span>
                        {status === 'critical' && (
                          <span className="inv-critical-label">
                            <AlertTriangle size={11} /> Critical — reorder now!
                          </span>
                        )}
                        {status === 'low' && (
                          <span className="inv-low-label">
                            ~ Low stock warning
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`inv-stock-num ${status}`}>{item.stock}</span>
                    <span className="inv-stock-unit">{item.unit}</span>
                  </td>
                  <td className="inv-threshold">Min: {item.minStock} {item.unit}</td>
                  <td>
                    <div className="inv-level-wrap">
                      <div className="inv-level-bar">
                        <div
                          className="inv-level-fill"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                      <span className="inv-level-pct">{Math.round(pct)}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="inv-actions">
                      <button className="inv-adj-btn" onClick={() => adjustStock(item.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <button className="inv-adj-btn plus" onClick={() => adjustStock(item.id, 1)}>
                        <Plus size={14} />
                      </button>
                      {(status === 'critical' || status === 'low') && (
                        <button className="inv-reorder-btn">Reorder</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Notice */}
      <div className="inventory-footer-notice">
        <div className="inv-footer-icon">📦</div>
        <div>
          <strong>Auto-Deduction System Active</strong>
          <p>Inventory is automatically deducted when orders are marked as preparing. Quantities above reflect current available stock.</p>
        </div>
      </div>
    </div>
  );
}
