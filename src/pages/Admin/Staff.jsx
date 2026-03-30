import { useState } from 'react';
import { staffMembers as initialStaff } from '../../data/mockData';
import { Search, Plus, User, ChefHat, GlassWater, Users, Trash2 } from 'lucide-react';

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = staff
    .filter((s) => {
      if (activeFilter === 'All') return true;
      return s.role === activeFilter;
    })
    .filter((s) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    });

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin': return <User size={16} />;
      case 'Chef': return <ChefHat size={16} />;
      case 'Waiter': return <GlassWater size={16} />;
      default: return <Users size={16} />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return '#F97316';
      case 'Chef': return '#8B5CF6';
      case 'Waiter': return '#3B82F6';
      case 'Customer': return '#14B8A6';
      default: return '#6B7280';
    }
  };

  const roleCounts = {
    Admin: staff.filter(s => s.role === 'Admin').length,
    Chef: staff.filter(s => s.role === 'Chef').length,
    Waiter: staff.filter(s => s.role === 'Waiter').length,
    Customer: staff.filter(s => s.role === 'Customer').length || 0,
  };

  const toggleStatus = (id) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s));
  };

  return (
    <div>
      {/* Role Summary Cards */}
      <div className="staff-summary-cards">
        <div className="staff-summary-card admin">
          <div className="staff-role-header">
            <div className="staff-role-icon" style={{ background: '#FFF7ED', color: '#F97316' }}><User size={16} /></div>
            <span>Admin</span>
          </div>
          <h3>{roleCounts.Admin}</h3>
          <p>members</p>
          <div style={{ marginTop: 12 }}>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Full system access</p>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Menu management</p>
          </div>
        </div>

        <div className="staff-summary-card chef">
          <div className="staff-role-header">
            <div className="staff-role-icon" style={{ background: '#F5F3FF', color: '#8B5CF6' }}><ChefHat size={16} /></div>
            <span>Chef</span>
          </div>
          <h3>{roleCounts.Chef}</h3>
          <p>members</p>
          <div style={{ marginTop: 12 }}>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Kitchen display access</p>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Update order status</p>
          </div>
        </div>

        <div className="staff-summary-card waiter">
          <div className="staff-role-header">
            <div className="staff-role-icon" style={{ background: '#EFF6FF', color: '#3B82F6' }}><GlassWater size={16} /></div>
            <span>Waiter</span>
          </div>
          <h3>{roleCounts.Waiter}</h3>
          <p>members</p>
          <div style={{ marginTop: 12 }}>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Waiter dashboard</p>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Mark orders delivered</p>
          </div>
        </div>

        <div className="staff-summary-card customer">
          <div className="staff-role-header">
            <div className="staff-role-icon" style={{ background: '#F0FDF4', color: '#14B8A6' }}><Users size={16} /></div>
            <span>Customer</span>
          </div>
          <h3>{roleCounts.Customer}</h3>
          <p>members</p>
          <div style={{ marginTop: 12 }}>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Browse menu</p>
            <p style={{ color: '#9CA3AF', fontSize: '0.688rem' }}>• Place orders</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="staff-filter-bar">
        <div className="staff-search-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="staff-search-input"
          />
        </div>
        <div className="staff-filters">
          {['All', 'Admin', 'Chef', 'Waiter'].map((role) => (
            <button
              key={role}
              className={`staff-filter-btn ${activeFilter === role ? 'active' : ''}`}
              onClick={() => setActiveFilter(role)}
            >
              {role}
            </button>
          ))}
        </div>
        <button className="add-item-btn">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Staff Grid */}
      <div className="staff-grid-v2">
        {filtered.map((member) => (
          <div className="staff-card-v2" key={member.id}>
            <div className="staff-card-header">
              <div
                className="staff-card-avatar"
                style={{ background: member.avatar }}
              >
                {getRoleIcon(member.role)}
              </div>
              <div className="staff-card-info">
                <h4>{member.name}</h4>
                <p>{member.email}</p>
                <div className="staff-status-badges">
                  <span className="staff-role-badge">{member.role}</span>
                  <span className={`staff-status-pill ${member.status}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                </div>
              </div>
              <button className="order-eye-btn" style={{ position: 'absolute', top: 20, right: 20 }}>
                <Trash2 size={16} />
              </button>
              <div style={{ fontSize: '0.688rem', color: '#9CA3AF', position: 'absolute', bottom: 10, right: 20 }}>
                Joined {member.joinDate}
              </div>
            </div>
            <div className="staff-card-body">
              <div className="staff-permissions">
                {member.permissions.map((perm, i) => (
                  <span key={i} className="staff-permission-tag">
                    {perm}{i < member.permissions.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
            <div className="staff-card-footer">
               {/* Simplified Toggle Switch UI */}
               <div
                 onClick={() => toggleStatus(member.id)}
                 style={{
                   width: 32,
                   height: 18,
                   borderRadius: 9,
                   background: member.status === 'active' ? '#22C55E' : '#E5E7EB',
                   position: 'relative',
                   cursor: 'pointer',
                   transition: 'background 0.2s'
                 }}
               >
                 <div style={{
                   width: 14,
                   height: 14,
                   borderRadius: '50%',
                   background: 'white',
                   position: 'absolute',
                   top: 2,
                   left: member.status === 'active' ? 16 : 2,
                   transition: 'left 0.2s'
                 }} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
