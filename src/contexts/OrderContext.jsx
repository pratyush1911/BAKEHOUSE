import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const OrderContext = createContext(null);

const STORAGE_KEY = 'bakehouse_orders';

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback((orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Preparing',
      ...orderData,
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const getOrder = useCallback((orderId) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const value = {
    orders,
    createOrder,
    getOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
