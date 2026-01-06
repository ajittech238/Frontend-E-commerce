import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

import { Header } from "./Header";

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
     
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}/>
        
        <main className="flex-1 p-6 overflow-auto scrollbar-thin">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
