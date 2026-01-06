import { DashboardLayout } from "@/components/dashboardlayout/DashboardLayout";
import { KPICard } from "@/components/shopmaindashboard/KPICard";
import { SalesChart } from "@/components/shopmaindashboard/SalesChart";
import { RecentOrders } from "@/components/shopmaindashboard/RecentOrders";
import { TopProducts } from "@/components/shopmaindashboard/TopProducts";
import { LowStockAlert } from "@/components/shopmaindashboard/LowStockAlert";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

const ShopIndex = () => {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, here's your store overview">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <KPICard
          title="Total Sales"
          value="$128,430"
          change={12.5}
          changeLabel="vs last month"
          icon={DollarSign}
          variant="primary"
          delay={0}
        />
        <KPICard
          title="Total Orders"
          value="1,429"
          change={8.2}
          changeLabel="vs last month"
          icon={ShoppingCart}
          variant="success"
          delay={50}
        />
        <KPICard
          title="Total Customers"
          value="3,847"
          change={15.3}
          changeLabel="vs last month"
          icon={Users}
          variant="info"
          delay={100}
        />
        <KPICard
          title="Revenue Today"
          value="$4,285"
          change={-2.4}
          changeLabel="vs yesterday"
          icon={TrendingUp}
          variant="warning"
          delay={150}
        />
        <KPICard
          title="Pending Orders"
          value="23"
          icon={Clock}
          variant="default"
          delay={200}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <TopProducts />
      </div>

      {/* Recent Orders and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <LowStockAlert />
      </div>
    </DashboardLayout>
  );
};

export default ShopIndex;
