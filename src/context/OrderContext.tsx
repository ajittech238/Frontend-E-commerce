import React, { createContext, useContext, useState, useCallback } from "react";
import { Order } from "@/types/product";

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["orderStatus"]) => void;
  updatePaymentStatus: (orderId: string, status: Order["paymentStatus"]) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getCustomerOrders: (customerId: string) => Order[];
  getSellerOrders: (sellerId: string) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = useCallback((order: Order) => {
    setOrders((prev) => [...prev, order]);
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, status: Order["orderStatus"]) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, orderStatus: status, updatedAt: new Date().toISOString() }
            : order
        )
      );
    },
    []
  );

  const updatePaymentStatus = useCallback(
    (orderId: string, status: Order["paymentStatus"]) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, paymentStatus: status, updatedAt: new Date().toISOString() }
            : order
        )
      );
    },
    []
  );

  const getOrderById = useCallback(
    (orderId: string) => {
      return orders.find((order) => order.id === orderId);
    },
    [orders]
  );

  const getCustomerOrders = useCallback(
    (customerId: string) => {
      return orders.filter((order) => order.customerId === customerId);
    },
    [orders]
  );

  const getSellerOrders = useCallback(
    (sellerId: string) => {
      return orders.filter((order) => order.sellerId === sellerId);
    },
    [orders]
  );

  const getAllOrders = useCallback(() => {
    return orders;
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        getOrderById,
        getCustomerOrders,
        getSellerOrders,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
