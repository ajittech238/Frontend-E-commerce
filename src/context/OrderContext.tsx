import React, { createContext, useContext, useState, useCallback } from "react";
import { Order } from "@/types/product";

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerId: "CUST001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    items: [],
    subtotal: 14000,
    tax: 1000,
    shipping: 0,
    total: 15000,
    shippingAddress: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    paymentMethod: "Credit Card",
    paymentStatus: "pending",
    orderStatus: "pending",
    sellerId: "SELLER001",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "ORD002",
    customerId: "CUST002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    items: [],
    subtotal: 24000,
    tax: 1000,
    shipping: 0,
    total: 25000,
    shippingAddress: {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "123-456-7890",
      address: "456 Oak Ave",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    paymentMethod: "PayPal",
    paymentStatus: "completed",
    orderStatus: "confirmed",
    sellerId: "SELLER002",
    createdAt: new Date("2024-01-16").toISOString(),
    updatedAt: new Date("2024-01-16").toISOString(),
  },
  {
    id: "ORD003",
    customerName: "Bob Johnson",
    total: 35000,
    orderStatus: "processing",
    paymentStatus: "completed",
    createdAt: new Date("2024-01-17").toISOString(),
    customerId: "CUST003",
    sellerId: "SELL001",
    items: [],
    shippingAddress: {
      fullName: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "123-456-7890",
      address: "789 Pine Ln",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    updatedAt: new Date("2024-01-17").toISOString(),
    subtotal: 34000,
    tax: 1000,
    shipping: 0,
    customerEmail: "bob.johnson@example.com",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD004",
    customerName: "Alice Williams",
    total: 12000,
    orderStatus: "shipped",
    paymentStatus: "completed",
    createdAt: new Date("2024-01-18").toISOString(),
    customerId: "CUST004",
    sellerId: "SELL003",
    items: [],
    shippingAddress: {
      fullName: "Alice Williams",
      email: "alice.williams@example.com",
      phone: "123-456-7890",
      address: "101 Maple Dr",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    updatedAt: new Date("2024-01-18").toISOString(),
    subtotal: 11000,
    tax: 1000,
    shipping: 0,
    customerEmail: "alice.williams@example.com",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD005",
    customerName: "Charlie Brown",
    total: 45000,
    orderStatus: "delivered",
    paymentStatus: "completed",
    createdAt: new Date("2024-01-19").toISOString(),
    customerId: "CUST005",
    sellerId: "SELL002",
    items: [],
    shippingAddress: {
      fullName: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "123-456-7890",
      address: "212 Birch Rd",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    updatedAt: new Date("2024-01-19").toISOString(),
    subtotal: 44000,
    tax: 1000,
    shipping: 0,
    customerEmail: "charlie.brown@example.com",
    paymentMethod: "Credit Card",
  },
];


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
  const [orders, setOrders] = useState<Order[]>(mockOrders);

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
