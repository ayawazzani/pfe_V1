import { analyticsData } from '../../data/mockData';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import {
  DollarSign, ShoppingBag, Clock, RotateCcw,
  TrendingUp,
} from 'lucide-react';

export default function Analytics() {
  const topStats = [
    { label: "Today's Revenue", value: '$2,340', change: '+12.5%', color: '#F97316', icon: DollarSign, badgeClr: 'orange' },
    { label: 'Orders Today', value: '47', change: '+8.2%', color: '#3B82F6', icon: ShoppingBag, badgeClr: 'blue' },
    { label: 'Avg Prep Time', value: '16.2m', change: '-2.1m', color: '#14B8A6', icon: Clock, badgeClr: 'green' },
    { label: 'Table Turnover', value: '4.2x', change: '+0.3', color: '#8B5CF6', icon: RotateCcw, badgeClr: 'purple' },
  ];

  return (
    <div className="analytics-container">
      {/* Top Stats Row */}
      <div className="top-stats-grid">
        {topStats.map((stat, i) => (
          <div className="top-stat-card" key={i}>
            <div className="top-stat-header">
              <div className="top-stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div className={`top-stat-badge ${stat.badgeClr}`}>
                <TrendingUp size={12} />
                {stat.change}
              </div>
            </div>
            <div className="top-stat-value">{stat.value}</div>
            <div className="top-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="charts-grid-main">
        {/* Daily Revenue */}
        <div className="chart-card-v3">
          <div className="chart-card-header-v3">
            <div>
              <h3>Daily Revenue</h3>
              <p>This week</p>
            </div>
            <div className="top-stat-badge orange">
               +14.3% vs last week
            </div>
          </div>
          <div className="chart-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.dailyRevenue}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  domain={[0, 2800]}
                  ticks={[0, 700, 1400, 2100, 2800]}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#F97316" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  dot={{ r: 4, fill: '#F97316', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Mix */}
        <div className="chart-card-v3">
          <div className="chart-card-header-v3">
            <div>
              <h3>Category Mix</h3>
              <p>Revenue by category</p>
            </div>
          </div>
          <div className="donut-container">
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryMix}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.categoryMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="donut-legend-v3">
              {analyticsData.categoryMix.map((item, i) => (
                <div key={i} className="legend-item-v3">
                  <div className="legend-left">
                    <div className="legend-dot-v3" style={{ background: item.color }} />
                    <span className="legend-label-v3">{item.name}</span>
                  </div>
                  <span className="legend-value-v3">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="charts-grid-secondary">
        {/* Peak Hours */}
        <div className="chart-card-v3">
          <div className="chart-card-header-v3">
            <div>
              <h3>Peak Hours</h3>
              <p>Orders per hour · Today</p>
            </div>
            <div className="chart-badge-tag">Peak: 8pm</div>
          </div>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.peakHours}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 11}} 
                />
                <YAxis hide domain={[0, 60]} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar 
                  dataKey="orders" 
                  radius={[6, 6, 0, 0]} 
                  barSize={16}
                >
                  {analyticsData.peakHours.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.hour === '8pm' ? '#2563EB' : '#BFDBFE'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Dishes */}
        <div className="chart-card-v3">
          <div className="chart-card-header-v3">
            <div>
              <h3>Top Dishes</h3>
              <p>This month's best sellers</p>
            </div>
          </div>
          <div className="dish-list-v3">
            {analyticsData.topDishes.map((dish, i) => (
              <div key={i} className="dish-item-v3">
                <div className="dish-top-row">
                  <div>
                    <span className="dish-rank-v3">#{dish.rank}</span>
                    <span className="dish-name-v3">{dish.name}</span>
                  </div>
                  <span className="dish-count-v3">{dish.orders} orders</span>
                </div>
                <div className="dish-progress-container">
                  <div 
                    className="dish-progress-bar" 
                    style={{ 
                      width: `${(dish.orders / 165) * 100}%`,
                      background: i < 3 ? '#F97316' : '#94a3b8'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Wide */}
      <div className="monthly-revenue-card">
        <div className="chart-card-header-v3">
          <div>
            <h3>Monthly Revenue</h3>
            <p>Last 6 months</p>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.75rem' }}>
            <span style={{ color: '#94a3b8' }}>Avg: <strong style={{ color: '#475569' }}>$37,033</strong></span>
            <span style={{ color: '#94a3b8' }}>Best: <strong style={{ color: '#10B981' }}>$45,600</strong></span>
          </div>
        </div>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}}
                tickFormatter={(val) => `$${val/1000}k`}
              />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar 
                dataKey="revenue" 
                radius={[6, 6, 0, 0]} 
                barSize={40}
              >
                {analyticsData.monthlyRevenue.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.month === 'Dec' ? '#10B981' : '#D1FAE5'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Insights */}
      <div className="bottom-insights-grid">
        <div className="bottom-insight-card">
          <div className="insight-val">16.2 min</div>
          <div className="insight-lbl">Avg Prep Time</div>
          <div className="insight-badge green">-2.1m vs last week</div>
        </div>
        <div className="bottom-insight-card">
          <div className="insight-val">2.4 min</div>
          <div className="insight-lbl">Avg Delivery Time</div>
          <div className="insight-badge green">-0.3m vs last week</div>
        </div>
        <div className="bottom-insight-card">
          <div className="insight-val">4.2x/day</div>
          <div className="insight-lbl">Table Turnover Rate</div>
          <div className="insight-badge green">+0.3 vs last week</div>
        </div>
      </div>
    </div>
  );
}
