import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone?: string;
  dob?: string;
  ordersCount?: number;
  totalSpent?: string;
  orders?: any[];
  addresses?: any[];
}

interface CustomerAuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  addOrder: (order: any) => void;
  addAddress: (address: any) => void;
  isAuthenticated: boolean;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("customerUser");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    // Default dummy user for immediate access
    const dummyUser: User = {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?u=john",
      role: "Customer",
      phone: "+91 98765-43210",
      dob: "12 January, 1995",
      ordersCount: 0,
      totalSpent: "₹0",
      orders: [],
      addresses: []
    };
    localStorage.setItem("customerUser", JSON.stringify(dummyUser));
    return dummyUser;
  });

  useEffect(() => {
    // Keep localStorage in sync if needed
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("customerUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("customerUser");
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      localStorage.setItem("customerUser", JSON.stringify(newUser));
    }
  };

  const addOrder = (order: any) => {
    if (user) {
      const currentOrders = user.orders || [];
      const newOrders = [order, ...currentOrders];
      const currentSpent = parseInt(user.totalSpent?.replace(/[^0-9]/g, "") || "0");
      const newSpent = currentSpent + order.total;
      
      const newUser = {
        ...user,
        orders: newOrders,
        ordersCount: (user.ordersCount || 0) + 1,
        totalSpent: `₹${newSpent.toLocaleString()}`
      };
      setUser(newUser);
      localStorage.setItem("customerUser", JSON.stringify(newUser));
    }
  };

  const addAddress = (address: any) => {
    if (user) {
      const currentAddresses = user.addresses || [];
      // Check if address already exists
      const exists = currentAddresses.find((a: any) => a.address === address.address);
      if (!exists) {
        const newAddresses = [...currentAddresses, address];
        const newUser = { ...user, addresses: newAddresses };
        setUser(newUser);
        localStorage.setItem("customerUser", JSON.stringify(newUser));
      }
    }
  };

  return (
    <CustomerAuthContext.Provider value={{ user, login, logout, updateProfile, addOrder, addAddress, isAuthenticated: !!user }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider");
  }
  return context;
};
