import { Routes, Route, Navigate } from "react-router-dom";
import { WarehouseAuthProvider } from "./WarehouseAuthContext";
import WarehouseLayout from "./WarehouseLayout";
import WarehouseDashboard from "./WarehouseDashboard";
import WarehouseInventory from "./WarehouseInventory";
import WarehouseOrders from "./WarehouseOrders";
import WarehouseLogin from "./WarehouseLogin";
import WarehouseProtectedRoute from "./WarehouseProtectedRoute";

export default function WarehouseRoutes() {
  return (
    <WarehouseAuthProvider>
      <Routes>
        <Route path="login" element={<WarehouseLogin />} />

        <Route
          element={
            <WarehouseProtectedRoute>
              <WarehouseLayout />
            </WarehouseProtectedRoute>
          }
        >
          <Route index element={<WarehouseDashboard />} />
          <Route path="inventory" element={<WarehouseInventory />} />
          <Route path="orders" element={<WarehouseOrders />} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/warehouse" replace />} />
      </Routes>
    </WarehouseAuthProvider>
  );
}
