import { useState } from 'react';
import { menuItems as initialMenuItems, categories } from '../../data/mockData';
import { Plus, Edit2, X, Search, CheckCircle, Clock } from 'lucide-react';

export default function MenuManagement() {
  const [items, setItems] = useState(initialMenuItems);
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filtered = items
    .filter((i) => {
      if (activeCategory === 'All Items') return true;
      return i.category === activeCategory;
    })
    .filter((i) => {
      if (!searchQuery) return true;
      return i.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const availableCount = items.filter((i) => i.available).length;
  const unavailableCount = items.filter((i) => !i.available).length;

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleAvailability = (id) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, available: !i.available } : i));
  };

  const handleSave = (data) => {
    if (editItem) {
      setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...data } : i)));
    } else {
      const newItem = {
        ...data,
        id: Math.max(...items.map((i) => i.id)) + 1,
        available: true,
        options: data.options || [],
      };
      setItems((prev) => [...prev, newItem]);
    }
    setShowModal(false);
    setEditItem(null);
  };

  const getCategoryColor = (catName) => {
    const cat = categories.find((c) => c.name === catName);
    return cat ? cat.color : '#6B7280';
  };

  return (
    <div>
      {/* Stats */}
      <div className="menu-stats-row">
        <div className="menu-stat-box">
          <span className="menu-stat-num">{items.length}</span>
          <span className="menu-stat-label">Total Items</span>
        </div>
        <div className="menu-stat-box green">
          <span className="menu-stat-num">{availableCount}</span>
          <span className="menu-stat-label">Available</span>
        </div>
        <div className="menu-stat-box red">
          <span className="menu-stat-num">{unavailableCount}</span>
          <span className="menu-stat-label">Unavailable</span>
        </div>
        <div style={{ flex: 1 }} />
        <button
          className="add-item-btn"
          onClick={() => { setEditItem(null); setShowModal(true); }}
          id="add-menu-item-btn"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Search + Filters */}
      <div className="menu-filter-bar">
        <div className="menu-search-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="menu-search-input"
          />
        </div>
        <div className="menu-categories">
          {['All Items', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              className={`menu-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Card Grid */}
      <div className="menu-grid-v2">
        {filtered.map((item) => (
          <div className="menu-card-v2" key={item.id}>
            <div className="menu-card-img">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="menu-card-placeholder">
                  {categories.find(c => c.name === item.category)?.icon || '🍽️'}
                </div>
              )}
              <span
                className="menu-card-category"
                style={{ background: getCategoryColor(item.category) }}
              >
                {item.category}
              </span>
              <button
                className="menu-card-edit"
                onClick={() => { setEditItem(item); setShowModal(true); }}
              >
                <Edit2 size={13} />
              </button>
            </div>
            <div className="menu-card-body">
              <h4 className="menu-card-name">{item.name}</h4>
              <p className="menu-card-desc">{item.description}</p>
              <div className="menu-card-meta">
                <span className="menu-card-price">${item.price.toFixed(2)}</span>
                <span className="menu-card-time">
                  <Clock size={12} />
                  {item.prepTime}m
                </span>
              </div>
              {item.options && item.options.length > 0 && (
                <div className="menu-card-options">
                  {item.options.slice(0, 3).map((opt, i) => (
                    <span key={i} className="menu-card-option-tag">{opt}</span>
                  ))}
                  {item.options.length > 3 && (
                    <span className="menu-card-option-tag more">+{item.options.length - 3}</span>
                  )}
                </div>
              )}
              <div className={`menu-card-availability ${item.available ? 'available' : 'unavailable'}`}>
                <CheckCircle size={13} />
                {item.available ? 'Available' : 'Unavailable'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <MenuModal
          item={editItem}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditItem(null); }}
        />
      )}
    </div>
  );
}

function MenuModal({ item, onSave, onClose }) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState(item?.category || 'Starters');
  const [price, setPrice] = useState(item?.price || '');
  const [description, setDescription] = useState(item?.description || '');
  const [prepTime, setPrepTime] = useState(item?.prepTime || '');
  const [imageUrl, setImageUrl] = useState(item?.image || '');
  const [optionsText, setOptionsText] = useState(item?.options?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      category,
      categoryId: categories.find((c) => c.name === category)?.id || 1,
      price: parseFloat(price),
      description,
      prepTime: parseInt(prepTime),
      image: imageUrl || null,
      options: optionsText.split(',').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Item name" />
          </div>
          <div className="modal-field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="0.00" />
            </div>
            <div className="modal-field">
              <label>Prep Time (min)</label>
              <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="15" />
            </div>
          </div>
          <div className="modal-field">
            <label>Image URL</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="modal-field">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Item description..." />
          </div>
          <div className="modal-field">
            <label>Options (comma separated)</label>
            <input value={optionsText} onChange={(e) => setOptionsText(e.target.value)} placeholder="Extra Cheese, Add Bacon" />
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-btn secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal-btn primary">{item ? 'Save Changes' : 'Add Item'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
