import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerDashboard from "../pages/CustomerDashboard";
import CustomerOverview from "../pages/CustomerOverview";
import CustomerProfile from "../pages/CustomerProfile";
import CustomerOrders from "../pages/CustomerOrders";
import CustomerWishlist from "../pages/CustomerWishlist";
import CustomerAddresses from "../pages/CustomerAddresses";
import ChangePassword from "../pages/ChangePassword";
import CustomerNotifications from "../pages/CustomerNotifications";
import CustomerReferEarn from "../pages/CustomerReferEarn";
import CustomerRewards from "../pages/CustomerRewards";
import CustomerQA from "../pages/CustomerQA";
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
        <Route index element={<CustomerOverview />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="wishlist" element={<CustomerWishlist />} />
        <Route path="addresses" element={<CustomerAddresses />} />
        <Route path="notifications" element={<CustomerNotifications />} />
        <Route path="refer-earn" element={<CustomerReferEarn />} />
        <Route path="rewards" element={<CustomerRewards />} />
        <Route path="qa" element={<CustomerQA />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
