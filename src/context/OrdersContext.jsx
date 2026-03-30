import { createContext, useContext, useState, useCallback } from 'react';
import { initialOrders } from '../data/mockData';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              ...(newStatus === 'delivered' ? { deliveredAt: new Date().toISOString() } : {}),
            }
          : order
      )
    );
  }, []);

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
