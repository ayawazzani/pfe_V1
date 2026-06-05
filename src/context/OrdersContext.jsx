import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api';
import { io } from 'socket.io-client';

const OrdersContext = createContext(null);

const formatOrder = (order) => ({
  id: `ORD-${String(order.id).padStart(3, '0')}`,
  realId: order.id,
  status: order.status,
  tableNumber: order.table?.id || order.table_id,
  createdAt: order.created_at,
  total: Number(order.total_amount ?? order.total ?? 0),
  items: order.items.map(item => ({
    quantity: item.quantity,
    name: item.product?.name || 'Unknown product',
    notes: item.special_instructions || null,
    options: [],
  })),
});

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
  try {
    console.log('Fetching orders...');

    const response = await api.get('/orders');

    console.log('Orders API response:', response.data);

    const formatted = response.data.data.map(formatOrder);

    console.log('Formatted orders:', formatted);

    setOrders(formatted);
  } catch (error) {
    console.error('Fetch orders error:', error.response?.status, error.response?.data);
  }
}, []);

  useEffect(() => {
  fetchOrders();

  const interval = setInterval(() => {
    fetchOrders();
  }, 3000);

  return () => {
    clearInterval(interval);
  };
}, [fetchOrders]);

  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    const realId = typeof orderId === 'string'
      ? Number(orderId.replace('ORD-', ''))
      : orderId;

    await api.patch(`/orders/${realId}/status`, {
      status: newStatus,
    });

    await fetchOrders();
  }, [fetchOrders]);

  const getOrdersByStatus = useCallback(
    (status) => orders.filter((o) => o.status === status),
    [orders]
  );

  const getActiveOrders = useCallback(
    () => orders.filter((o) => !['delivered', 'paid', 'cancelled'].includes(o.status)),
    [orders]
  );

  const getReadyOrders = useCallback(
    () => orders.filter((o) => o.status === 'ready'),
    [orders]
  );

  const getDeliveredOrders = useCallback(
    () => orders.filter((o) => o.status === 'delivered'),
    [orders]
  );

  const getKitchenOrders = useCallback(
    () => orders.filter((o) => ['new', 'accepted', 'preparing', 'ready'].includes(o.status)),
    [orders]
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        fetchOrders,
        updateOrderStatus,
        getOrdersByStatus,
        getActiveOrders,
        getReadyOrders,
        getDeliveredOrders,
        getKitchenOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within OrdersProvider');
  return context;
}