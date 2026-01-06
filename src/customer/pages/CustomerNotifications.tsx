import React from "react";
import { Bell, ShoppingBag, Heart, Info, CheckCircle2, Clock } from "lucide-react";

const CustomerNotifications: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: "Order Delivered",
      message: "Your order #ORD-98231 has been successfully delivered. We hope you love your purchase!",
      time: "2 hours ago",
      type: "order",
      unread: true,
      icon: ShoppingBag,
      color: "text-green-500 bg-green-500/10"
    },
    {
      id: 2,
      title: "Price Drop Alert",
      message: "An item in your wishlist 'Luxury Silk Dress' just dropped in price by 15%!",
      time: "5 hours ago",
      type: "wishlist",
      unread: true,
      icon: Heart,
      color: "text-pink-500 bg-pink-500/10"
    },
    {
      id: 3,
      title: "Exclusive Reward",
      message: "Congratulations! You've earned 50 loyalty points from your last review.",
      time: "1 day ago",
      type: "reward",
      unread: false,
      icon: CheckCircle2,
      color: "text-amber-500 bg-amber-500/10"
    },
    {
      id: 4,
      title: "Security Update",
      message: "Your password was successfully changed yesterday. If you didn't do this, contact support.",
      time: "2 days ago",
      type: "security",
      unread: false,
      icon: Info,
      color: "text-blue-500 bg-blue-500/10"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">Notifications</h1>
          <p className="text-muted-foreground mt-2 font-medium">Stay updated with your latest activities and alerts.</p>
        </div>
        <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`bg-card border rounded-3xl p-6 transition-all hover:shadow-md flex gap-6 items-start ${notif.unread ? 'border-primary/30 shadow-sm' : 'border-border opacity-80'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
              <notif.icon size={24} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-foreground text-lg">{notif.title}</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <Clock size={12} />
                  {notif.time}
                </div>
              </div>
              <p className="text-muted-foreground font-medium leading-relaxed">{notif.message}</p>
            </div>
            {notif.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shadow-lg shadow-pink-500/40" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotifications;
