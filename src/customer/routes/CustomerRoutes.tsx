import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from "../pages/CustomerDashboard";
import CustomerProfile from "../pages/CustomerProfile";
import CustomerOrders from "../pages/CustomerOrders";
import CustomerWishlist from "../pages/CustomerWishlist";
import CustomerAddresses from "../pages/CustomerAddresses";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "./ProtectedRoute";

const CustomerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerProfile />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="wishlist" element={<CustomerWishlist />} />
        <Route path="addresses" element={<CustomerAddresses />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
