import React from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import CustomerHeader from "../components/CustomerHeader";

const CustomerDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-background dashboard-pink-theme transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0">
        <CustomerSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <CustomerHeader />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
