import React from "react";
import { Navigate } from "react-router-dom";
import { useWarehouseAuth } from "../../WarehouseAuthContext";

export default function WarehouseProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useWarehouseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/warehouse/login" replace />;
  }

  return <>{children}</>;
}
