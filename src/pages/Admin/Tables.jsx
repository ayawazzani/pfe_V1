import { useState } from 'react';
import { tables as initialTables } from '../../data/mockData';
import { Plus, QrCode, X } from 'lucide-react';

export default function Tables() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTableQR, setSelectedTableQR] = useState(null);

  const handleAddTable = () => {
    const nextNum = Math.max(...tables.map(t => t.number)) + 1;
    setTables([...tables, { id: nextNum, number: nextNum, seats: 4, status: 'active' }]);
  };

  const handleViewQR = (tableNumber) => {
    setSelectedTableQR(tableNumber);
  };

  const closeQRModal = () => {
    setSelectedTableQR(null);
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
            <button className="qr-btn" onClick={() => handleViewQR(table.number)}>
              <QrCode size={18} />
              View QR Code
            </button>
          </div>
        ))}
      </div>

      {selectedTableQR && (
        <div className="modal-overlay" onClick={closeQRModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeQRModal}>
              <X size={24} />
            </button>
            <h2>QR Code for Table {selectedTableQR}</h2>
            <div className="qr-code-container">
              <img 
                src={`/qr-codes/table-${selectedTableQR}.jpeg`} 
                alt={`QR Code for Table ${selectedTableQR}`}
                className="qr-code-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}