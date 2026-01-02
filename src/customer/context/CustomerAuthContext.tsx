import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface CustomerAuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
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
    const dummyUser = {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?u=john",
      role: "Customer"
    };
    localStorage.setItem("customerUser", JSON.stringify(dummyUser));
    return dummyUser;
  });

  useEffect(() => {
    // Keep localStorage in sync if needed, though handled in login/logout/initialization
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("customerUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("customerUser");
  };

  return (
    <CustomerAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
