import { useState } from 'react';
import { tables as initialTables } from '../../data/mockData';
import { Plus, QrCode } from 'lucide-react';

export default function Tables() {
  const [tables, setTables] = useState(initialTables);

  const handleAddTable = () => {
    const nextNum = Math.max(...tables.map(t => t.number)) + 1;
    setTables([...tables, { id: nextNum, number: nextNum, seats: 4, status: 'active' }]);
  };

  return (
    <div>
      <div className="tables-header">
        <h3>Tables & QR Codes</h3>
        <button className="add-item-btn" onClick={handleAddTable}>
          <Plus size={18} />
          Add Table
        </button>
      </div>

      <div className="tables-grid">
        {tables.map((table) => (
          <div className="table-card" key={table.id}>
            <h3>Table {table.number}</h3>
            <div className="status">
              <div style={{ width: 8, height: 8, background: '#22C55E', borderRadius: '50%' }} />
              Active
            </div>
            <button className="qr-btn" onClick={() => alert(`QR Code for Table ${table.number}\nURL: http://localhost:5173/table/table-${table.number}`)}>
              <QrCode size={18} />
              View QR Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}