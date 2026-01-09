import React, { useState } from "react";
import { ShoppingBag, ChevronRight, Package, Clock, Search, Filter, Truck, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const CustomerOrders: React.FC = () => {
  const { user } = useCustomerAuth();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Processing", "In Transit", "Delivered", "Cancelled"];

  const allOrders = user?.orders?.map((order: any) => ({
    id: order.id,
    date: new Date(order.createdAt).toLocaleDateString(),
    total: `₹${order.total.toLocaleString()}`,
    status: order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1),
    items: order.items.length,
    products: order.items.map((i: any) => i.name),
    progress: order.orderStatus === 'delivered' ? 100 : 50
  })) || [];

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(initialSearch.toLowerCase()) ||
                          order.products.some(p => p.toLowerCase().includes(initialSearch.toLowerCase()));
    const matchesFilter = activeFilter === "All" || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Delivered": return { color: "text-emerald-500 bg-emerald-500/10", icon: CheckCircle2 };
      case "Processing": return { color: "text-blue-500 bg-blue-500/10", icon: Clock };
      case "In Transit": return { color: "text-amber-500 bg-amber-500/10", icon: Truck };
      case "Cancelled": return { color: "text-red-500 bg-red-500/10", icon: AlertCircle };
      default: return { color: "text-slate-500 bg-slate-500/10", icon: Package };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">Purchase History</h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage your orders, track shipments and download invoices.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary/5 px-6 py-3 rounded-[1.5rem] border border-primary/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Lifetime Orders</div>
              <div className="text-xl font-black text-foreground">24</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-[2rem] border border-border/50">
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-2 lg:pb-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-transparent text-muted-foreground hover:bg-accent"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search Order ID or Product..."
            className="w-full bg-accent/50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all outline-none font-medium"
          />
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const config = getStatusConfig(order.status);
            return (
              <div key={order.id} className="bg-white dark:bg-zinc-900 border border-border/50 rounded-[2.5rem] p-6 lg:p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="flex flex-col xl:flex-row gap-8">
                  {/* Left Info */}
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Package size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-black text-xl text-foreground tracking-tight">{order.id}</h3>
                          <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5", config.color)}>
                            <config.icon size={12} />
                            {order.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-4">
                          <span className="flex items-center gap-1.5"><Clock size={12} /> Ordered on {order.date}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-border" />
                          <span>{order.items} Items</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-accent/50 rounded-lg text-[10px] font-bold text-muted-foreground">
                          {p}
                        </div>
                      ))}
                    </div>

                    {order.status !== "Cancelled" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          <span>Delivery Progress</span>
                          <span className="text-foreground">{order.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-1000 shadow-[0_0_10px_rgba(255,75,145,0.5)]"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="xl:w-64 border-t xl:border-t-0 xl:border-l border-border/50 pt-6 xl:pt-0 xl:pl-8 flex flex-row xl:flex-col justify-between items-center xl:items-end gap-6">
                    <div className="text-right">
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Amount</div>
                      <div className="text-3xl font-black text-primary tracking-tighter">{order.total}</div>
                    </div>

                    <div className="flex flex-row xl:flex-col gap-2 w-full max-w-[280px]">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background dark:bg-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                        <Truck size={14} /> Track Order
                      </button>
                      <button className="w-12 h-12 xl:w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all">
                        <FileText size={14} /> <span className="hidden xl:inline">Invoice</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-dashed border-border/50 rounded-[3rem] p-20 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 rounded-[2rem] bg-accent flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
              <ShoppingBag size={48} />
            </div>
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">No Orders Found</h3>
            <p className="text-muted-foreground font-medium mt-2">Try searching for something else or browse our latest products.</p>
            <button className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
