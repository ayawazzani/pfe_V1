// ===== USERS =====
export const users = [
  {
    id: 1,
    name: 'Alex Martin',
    email: 'admin@restoyh.com',
    password: 'admin@YH20',
    role: 'admin',
    avatar: null,
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'waiter@restoyh.com',
    password: 'waiter@YH20',
    role: 'waiter',
    avatar: null,
  },
  {
    id: 3,
    name: 'Chef Marie',
    email: 'kitchen@restoyh.com',
    password: 'kitchen@YH20',
    role: 'kitchen',
    avatar: null,
  },
];

// ===== MENU CATEGORIES =====
export const categories = [
  { id: 1, name: 'Starters', color: '#22C55E', icon: '🥗' },
  { id: 2, name: 'Main Dishes', color: '#F97316', icon: '🍖' },
  { id: 3, name: 'Drinks', color: '#3B82F6', icon: '🍹' },
  { id: 4, name: 'Desserts', color: '#EF4444', icon: '🍰' },
];

// ===== MENU ITEMS =====
export const menuItems = [
  {
    id: 1, name: 'Classic Bruschetta', category: 'Starters', categoryId: 1,
    price: 8.50, description: 'Toasted bread with fresh tomatoes, basil, and garlic drizzle.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    available: true, prepTime: 8,
    options: ['Extra Cheese', 'Add Avocado', 'Extra Basil'],
  },
  {
    id: 2, name: 'Caesar Salad', category: 'Starters', categoryId: 1,
    price: 10.00, description: 'Crisp romaine lettuce with Caesar dressing, croutons, and shaved parmesan.',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    available: true, prepTime: 10,
    options: ['Add Chicken', 'Extra Croutons', 'Extra Dressing'],
  },
  {
    id: 3, name: 'Tomato Bisque', category: 'Starters', categoryId: 1,
    price: 7.00, description: 'Creamy roasted tomato soup with herb cream and sourdough croutons.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    available: true, prepTime: 10,
    options: ['Extra Cream', 'Add Croutons'],
  },
  {
    id: 4, name: 'Gourmet Burger', category: 'Main Dishes', categoryId: 2,
    price: 16.50, description: 'Angus beef patty with aged cheddar, caramelized onions, and house sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    available: true, prepTime: 15,
    options: ['Extra Cheese', 'Add Bacon', 'Add Avocado'],
  },
  {
    id: 5, name: 'Pasta Carbonara', category: 'Main Dishes', categoryId: 2,
    price: 14.00, description: 'Al dente spaghetti with creamy egg sauce, crispy pancetta, and black pepper.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    available: true, prepTime: 18,
    options: ['Extra Pancetta', 'Add Mushrooms', 'Gluten-Free Pasta'],
  },
  {
    id: 6, name: 'Grilled Salmon', category: 'Main Dishes', categoryId: 2,
    price: 22.00, description: 'Atlantic salmon fillet with lemon butter sauce, asparagus, and roasted potatoes.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    available: true, prepTime: 20,
    options: ['Extra Sauce', 'Add Salad', 'No Potatoes'],
  },
  {
    id: 7, name: 'Ribeye Steak', category: 'Main Dishes', categoryId: 2,
    price: 32.00, description: 'Prime 300g ribeye with truffle fries, grilled tomato, and mushroom jus.',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
    available: true, prepTime: 25,
    options: ['Extra Sauce', 'Add Prawns', 'Add Side Salad'],
  },
  {
    id: 8, name: 'Signature Cocktail', category: 'Drinks', categoryId: 3,
    price: 12.00, description: 'House special cocktail with seasonal fruits, premium spirits, and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    available: true, prepTime: 5,
    options: ['Non-Alcoholic', 'Extra Ice', 'No Sugar'],
  },
  {
    id: 9, name: 'Espresso Coffee', category: 'Drinks', categoryId: 3,
    price: 4.50, description: 'Rich espresso made from freshly ground premium single-origin beans.',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
    available: true, prepTime: 3,
    options: ['Add Milk', 'Soy Milk', 'Oat Milk'],
  },
  {
    id: 10, name: 'Chocolate Lava Cake', category: 'Desserts', categoryId: 4,
    price: 9.50, description: 'Warm molten chocolate cake with vanilla ice cream and fresh berry coulis.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    available: true, prepTime: 15,
    options: ['Extra Ice Cream', 'Add Caramel', 'Add Berries'],
  },
  {
    id: 11, name: 'New York Cheesecake', category: 'Desserts', categoryId: 4,
    price: 8.00, description: 'Classic baked cheesecake on a buttery biscuit base with seasonal fruit.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
    available: true, prepTime: 5,
    options: ['Extra Compote', 'Add Cream', 'Strawberry Topping'],
  },
  {
    id: 12, name: 'Tiramisu', category: 'Desserts', categoryId: 4,
    price: 8.50, description: 'Traditional Italian tiramisu with mascarpone, espresso ladyfingers, and cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    available: true, prepTime: 5,
    options: ['Extra Cocoa', 'No Alcohol'],
  },
];

// ===== TABLES =====
export const tables = [
  { id: 1, number: 1, seats: 4, status: 'active' },
  { id: 2, number: 2, seats: 2, status: 'active' },
  { id: 3, number: 3, seats: 6, status: 'active' },
  { id: 4, number: 4, seats: 4, status: 'active' },
  { id: 5, number: 5, seats: 2, status: 'active' },
  { id: 6, number: 6, seats: 8, status: 'active' },
];

// ===== ORDERS =====
export const initialOrders = [
  {
    id: 'ORD-001',
    tableId: 3,
    tableNumber: 3,
    status: 'preparing',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    items: [
      { menuItemId: 4, name: 'Gourmet Burger', quantity: 2, price: 16.50, options: ['Extra Cheese', 'Add Bacon'], notes: '' },
      { menuItemId: 8, name: 'Signature Cocktail', quantity: 1, price: 12.00, options: ['Non-Alcoholic'], notes: '' },
    ],
    total: 47.00,
  },
  {
    id: 'ORD-002',
    tableId: 7,
    tableNumber: 7,
    status: 'ready',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    items: [
      { menuItemId: 6, name: 'Grilled Salmon', quantity: 1, price: 22.00, options: ['Extra Sauce'], notes: '' },
      { menuItemId: 8, name: 'Signature Cocktail', quantity: 2, price: 12.00, options: ['Regular'], notes: '"Non-alcoholic for one"' },
    ],
    total: 46.00,
  },
  {
    id: 'ORD-003',
    tableId: 2,
    tableNumber: 2,
    status: 'new',
    createdAt: new Date(Date.now() - 27 * 60000).toISOString(),
    items: [
      { menuItemId: 1, name: 'Classic Bruschetta', quantity: 1, price: 8.50, options: ['Extra Cheese'], notes: '' },
      { menuItemId: 3, name: 'Tomato Bisque', quantity: 2, price: 7.00, options: [], notes: '"Extra hot please"' },
    ],
    total: 22.50,
  },
  {
    id: 'ORD-004',
    tableId: 5,
    tableNumber: 5,
    status: 'delivered',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    deliveredAt: new Date(Date.now() - 30 * 60000).toISOString(),
    items: [
      { menuItemId: 4, name: 'Gourmet Burger', quantity: 1, price: 16.50, options: [], notes: '' },
      { menuItemId: 9, name: 'Espresso Coffee', quantity: 1, price: 4.50, options: [], notes: '' },
    ],
    total: 36.50,
  },
  {
    id: 'ORD-005',
    tableId: 9,
    tableNumber: 9,
    status: 'paid',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    deliveredAt: new Date(Date.now() - 45 * 60000).toISOString(),
    items: [
      { menuItemId: 7, name: 'Ribeye Steak', quantity: 2, price: 32.00, options: ['Medium'], notes: '' },
      { menuItemId: 5, name: 'Pasta Carbonara', quantity: 1, price: 14.00, options: [], notes: '' },
      { menuItemId: 10, name: 'Chocolate Lava Cake', quantity: 2, price: 9.50, options: [], notes: '' },
    ],
    total: 36.00,
  },
  {
    id: 'ORD-006',
    tableId: 1,
    tableNumber: 1,
    status: 'accepted',
    createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
    items: [
      { menuItemId: 2, name: 'Caesar Salad', quantity: 1, price: 10.00, options: ['Add Chicken'], notes: '' },
      { menuItemId: 7, name: 'Ribeye Steak', quantity: 2, price: 32.00, options: ['Medium'], notes: '' },
      { menuItemId: 8, name: 'Signature Cocktail', quantity: 2, price: 12.00, options: ['Large'], notes: '' },
    ],
    total: 98.00,
  },
  {
    id: 'ORD-007',
    tableId: 5,
    tableNumber: 5,
    status: 'ready',
    createdAt: new Date(Date.now() - 26 * 60000).toISOString(),
    items: [
      { menuItemId: 2, name: 'Caesar Salad', quantity: 1, price: 10.00, options: ['Regular'], notes: '' },
    ],
    total: 10.00,
  },
];

// ===== ANALYTICS DATA =====
export const analyticsData = {
  todayRevenue: 2340,
  ordersToday: 47,
  avgPrepTime: 16.2,
  tableTurnover: 4.2,
  revenueChange: 12.5,
  ordersChange: 8.2,
  prepTimeChange: -2.1,
  turnoverChange: 0.3,
  dailyRevenue: [
    { day: 'Mon', revenue: 1200 },
    { day: 'Tue', revenue: 1400 },
    { day: 'Wed', revenue: 1100 },
    { day: 'Thu', revenue: 1350 },
    { day: 'Fri', revenue: 1800 },
    { day: 'Sat', revenue: 2400 },
    { day: 'Sun', revenue: 2100 },
  ],
  categoryMix: [
    { name: 'Main Dishes', value: 42, color: '#EF4444' },
    { name: 'Drinks', value: 28, color: '#F59E0B' },
    { name: 'Starters', value: 18, color: '#22C55E' },
    { name: 'Desserts', value: 12, color: '#8B5CF6' },
  ],
  peakHours: [
    { hour: '8am', orders: 5 },
    { hour: '10am', orders: 12 },
    { hour: '12pm', orders: 38 },
    { hour: '2pm', orders: 25 },
    { hour: '4pm', orders: 15 },
    { hour: '6pm', orders: 42 },
    { hour: '8pm', orders: 55 },
    { hour: '10pm', orders: 30 },
  ],
  topDishes: [
    { rank: 1, name: 'Signature Cocktail', orders: 165 },
    { rank: 2, name: 'Gourmet Burger', orders: 124 },
    { rank: 3, name: 'Choc Lava Cake', orders: 112 },
    { rank: 4, name: 'Pasta Carbonara', orders: 98 },
    { rank: 5, name: 'Grilled Salmon', orders: 87 },
    { rank: 6, name: 'Ribeye Steak', orders: 76 },
  ],
  monthlyRevenue: [
    { month: 'Sep', revenue: 28000 },
    { month: 'Oct', revenue: 32000 },
    { month: 'Nov', revenue: 35000 },
    { month: 'Dec', revenue: 45600 },
    { month: 'Jan', revenue: 38000 },
    { month: 'Feb', revenue: 34000 },
  ],
  avgMonthlyRevenue: 37033,
  bestMonth: 45600,
  avgDeliveryTime: 2.4,
  deliveryTimeChange: -0.3,
  tableTurnoverRate: 4.2,
  turnoverRateChange: 0.3,
};

// ===== INVENTORY DATA =====
export const inventoryItems = [
  { id: 1, name: 'Beef Patties', category: 'Meat', stock: 45, unit: 'pcs', minStock: 20, icon: '🥩' },
  { id: 2, name: 'Salmon Fillet', category: 'Seafood', stock: 8, unit: 'kg', minStock: 5, icon: '🐟' },
  { id: 3, name: 'Pasta', category: 'Dry Goods', stock: 12, unit: 'kg', minStock: 5, icon: '🍝' },
  { id: 4, name: 'Flour', category: 'Dry Goods', stock: 3, unit: 'kg', minStock: 10, icon: '🌾' },
  { id: 5, name: 'Tomatoes', category: 'Vegetables', stock: 15, unit: 'kg', minStock: 8, icon: '🍅' },
  { id: 6, name: 'Heavy Cream', category: 'Dairy', stock: 6, unit: 'L', minStock: 4, icon: '🥛' },
  { id: 7, name: 'Coffee Beans', category: 'Beverages', stock: 2, unit: 'kg', minStock: 3, icon: '☕' },
  { id: 8, name: 'Dark Chocolate', category: 'Baking', stock: 4, unit: 'kg', minStock: 2, icon: '🍫' },
  { id: 9, name: 'Parmesan Cheese', category: 'Dairy', stock: 7, unit: 'kg', minStock: 3, icon: '🧀' },
  { id: 10, name: 'Romaine Lettuce', category: 'Vegetables', stock: 18, unit: 'heads', minStock: 10, icon: '🥬' },
  { id: 11, name: 'Eggs', category: 'Dairy', stock: 60, unit: 'pcs', minStock: 30, icon: '🥚' },
  { id: 12, name: 'Butter', category: 'Dairy', stock: 1.5, unit: 'kg', minStock: 3, icon: '🧈' },
];

// ===== STAFF DATA =====
export const staffMembers = [
  { id: 1, name: 'Alex Martin', role: 'Admin', email: 'alex@Resto YH.com', status: 'active', joinDate: 'Jan 2023', permissions: ['Full system access', 'Menu management'], avatar: '#F97316' },
  { id: 2, name: 'Maria Santos', role: 'Chef', email: 'maria@Resto YH.com', status: 'active', joinDate: 'Feb 2023', permissions: ['Kitchen display access', 'Update order status'], avatar: '#8B5CF6' },
  { id: 3, name: 'James Wilson', role: 'Waiter', email: 'james@Resto YH.com', status: 'active', joinDate: 'Mar 2023', permissions: ['Waiter dashboard', 'Mark orders delivered'], avatar: '#3B82F6' },
  { id: 4, name: 'Sophie Chen', role: 'Waiter', email: 'sophie@Resto YH.com', status: 'active', joinDate: 'Apr 2023', permissions: ['Waiter dashboard', 'Mark orders delivered'], avatar: '#14B8A6' },
  { id: 5, name: 'Carlos Rivera', role: 'Chef', email: 'carlos@Resto YH.com', status: 'active', joinDate: 'May 2023', permissions: ['Kitchen display access', 'Update order status'], avatar: '#EAB308' },
  { id: 6, name: 'Emma Thompson', role: 'Waiter', email: 'emma@Resto YH.com', status: 'inactive', joinDate: 'Jun 2023', permissions: ['Waiter dashboard', 'Mark orders delivered'], avatar: '#EC4899' },
  { id: 7, name: 'David Kim', role: 'Chef', email: 'david@Resto YH.com', status: 'active', joinDate: 'Jul 2023', permissions: ['Kitchen display access', 'Update order status'], avatar: '#6366F1' },
];
