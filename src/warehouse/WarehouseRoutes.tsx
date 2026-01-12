import { Routes, Route, Navigate } from "react-router-dom";
import { WarehouseAuthProvider } from "./context/WarehouseAuthContext";
import WarehouseLayout from "./components/WarehouseLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import WarehouseProtectedRoute from "./components/WarehouseProtectedRoute";

export default function WarehouseRoutes() {
  return (
    <WarehouseAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route
          element={
            <WarehouseProtectedRoute>
              <WarehouseLayout />
            </WarehouseProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inbound" element={<div>Inbound Management</div>} />
          <Route path="outbound" element={<div>Outbound Management</div>} />
          <Route path="shipments" element={<div>Shipments & Tracking</div>} />
          <Route path="returns" element={<div>Returns Management</div>} />
          <Route path="suppliers" element={<div>Suppliers & Vendors</div>} />
          <Route path="locations" element={<div>Warehouse Locations</div>} />
          <Route path="staff" element={<div>Staff Management</div>} />
          <Route path="analytics" element={<div>Analytics & Reports</div>} />
          <Route path="automation" element={<div>Automation Rules</div>} />
          <Route path="security" element={<div>Security & Access Control</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/warehouse" replace />} />
      </Routes>
    </WarehouseAuthProvider>
  );
}
