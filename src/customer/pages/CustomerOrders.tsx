import React from "react";
import { ShoppingBag, ChevronRight, Package, Clock } from "lucide-react";

const CustomerOrders: React.FC = () => {
  const orders = [
    { id: "ORD-98231", date: "Mar 12, 2024", total: "$129.00", status: "Delivered", items: 3 },
    { id: "ORD-98210", date: "Mar 05, 2024", total: "$84.50", status: "Processing", items: 1 },
    { id: "ORD-98192", date: "Feb 28, 2024", total: "$210.00", status: "Shipped", items: 5 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-600";
      case "Processing": return "bg-blue-100 text-blue-600";
      case "Shipped": return "bg-amber-100 text-amber-600";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">My Orders</h1>
          <p className="text-muted-foreground mt-2 font-medium">Track your recent orders and view order history.</p>
        </div>
        <div className="bg-primary/10 px-6 py-3 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <ShoppingBag size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Orders</div>
            <div className="text-xl font-black text-foreground">12</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-3xl p-6 hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-primary">
                  <Package size={24} />
                </div>
                <div>
                  <div className="font-black text-foreground">{order.id}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} />
                    {order.date}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 flex-1 md:justify-end px-2 md:px-0">
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Items</div>
                  <div className="font-bold text-foreground">{order.items} items</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total</div>
                  <div className="font-black text-primary">{order.total}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
