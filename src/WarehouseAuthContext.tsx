import React, { createContext, useContext, useState, useEffect } from "react";

interface WarehouseUser {
  id: string;
  name: string;
  email: string;
  role: "warehouse_manager" | "warehouse_staff";
  warehouseId: string;
}

interface WarehouseAuthContextType {
  user: WarehouseUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const WarehouseAuthContext = createContext<
  WarehouseAuthContextType | undefined
>(undefined);

export const WarehouseAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<WarehouseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("warehouse_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login logic - Replace with actual API call
    if (email === "warehouse@zenith.com" && password === "password") {
      const mockUser: WarehouseUser = {
        id: "w1",
        name: "Warehouse Manager",
        email,
        role: "warehouse_manager",
        warehouseId: "WH-001",
      };
      setUser(mockUser);
      localStorage.setItem("warehouse_user", JSON.stringify(mockUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("warehouse_user");
  };

  return (
    <WarehouseAuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}
    >
      {children}
    </WarehouseAuthContext.Provider>
  );
};

export const useWarehouseAuth = () => {
  const context = useContext(WarehouseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useWarehouseAuth must be used within a WarehouseAuthProvider"
    );
  }
  return context;
};
