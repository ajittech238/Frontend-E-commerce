import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import CustomerHeader from "../components/CustomerHeader";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FDFCFD] dark:bg-[#0A0A0B] dashboard-pink-theme transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[60] lg:hidden backdrop-blur-md transition-all duration-500 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-[70] lg:static lg:block h-full shrink-0 transition-all duration-500 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="relative h-full">
          <CustomerSidebar onAction={() => setIsSidebarOpen(false)} />
          {isSidebarOpen && (
            <button
              aria-label="Close menu"
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-6 right-4 p-2.5 bg-white dark:bg-zinc-900 text-foreground rounded-full lg:hidden shadow-2xl border border-border/50 z-[80]"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <CustomerHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-10 pb-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
