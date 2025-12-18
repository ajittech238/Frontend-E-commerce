import { useState } from "react";
import { Gift, Zap, Lock, Unlock, TrendingUp, DollarSign, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/admin/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const rewardTiers = [
  { name: "Bronze", points: "0-999", perks: "5% discount", color: "from-amber-500 to-orange-500", locked: false },
  { name: "Silver", points: "1000-4999", perks: "10% discount, Free shipping", color: "from-slate-400 to-slate-500", locked: false },
  { name: "Gold", points: "5000-9999", perks: "15% discount, Free shipping, Birthday bonus", color: "from-yellow-400 to-yellow-500", locked: true },
  { name: "Platinum", points: "10000+", perks: "20% discount, Free shipping, VIP support", color: "from-blue-400 to-purple-500", locked: true },
];

const rewardHistory = [
  { id: "RWD001", action: "Purchase", points: "+150", date: "2024-01-25", status: "credited" },
  { id: "RWD002", action: "Referral", points: "+500", date: "2024-01-20", status: "credited" },
  { id: "RWD003", action: "Review", points: "+50", date: "2024-01-15", status: "credited" },
  { id: "RWD004", action: "Redemption", points: "-1000", date: "2024-01-10", status: "redeemed" },
  { id: "RWD005", action: "Birthday Bonus", points: "+200", date: "2024-01-05", status: "credited" },
];

export default function Rewards() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const currentPoints = 3450;
  const nextTierPoints = 5000;

  const columns = [
    { key: "action", header: "Action" },
    { key: "points", header: "Points" },
    { key: "date", header: "Date", render: (item: any) => new Date(item.date).toLocaleDateString() },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <Badge className={item.status === "credited" ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rewards Program</h1>
        <p className="text-muted-foreground mt-1">Earn and redeem points on every purchase</p>
      </div>

      {/* Current Points Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground font-medium">Your Reward Points</p>
              <p className="text-5xl font-bold text-foreground mt-2">{currentPoints}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {nextTierPoints - currentPoints} points to reach Gold tier
              </p>
            </div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Gift className="w-12 h-12 text-white" />
            </div>
          </div>
          <Progress value={(currentPoints / nextTierPoints) * 100} className="mt-6 h-2" />
        </CardContent>
      </Card>

      {/* Reward Tiers */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewardTiers.map((tier) => (
            <Card key={tier.name} className="relative overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{tier.points} points</p>
                  </div>
                  {tier.locked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Unlock className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <div className={`w-full h-1 bg-gradient-to-r ${tier.color} rounded-full`} />
                <p className="text-sm text-muted-foreground">{tier.perks}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Earn */}
      <Card>
        <CardHeader>
          <CardTitle>How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Shopping", value: "1 point per ₹1 spent", icon: "🛍️" },
              { title: "Referral", value: "500 points per friend signup", icon: "👥" },
              { title: "Review", value: "50 points per product review", icon: "⭐" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-accent/30 space-y-2">
                <p className="text-2xl">{item.icon}</p>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redemption Options */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Your Points</CardTitle>
          <CardDescription>Convert points to discounts or exclusive rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "₹500 Discount", cost: "1000 points", savings: "Save ₹500" },
              { name: "₹1000 Discount", cost: "2000 points", savings: "Save ₹1000" },
              { name: "₹2500 Discount", cost: "5000 points", savings: "Save ₹2500" },
              { name: "Free Shipping", cost: "200 points", savings: "Save shipping cost" },
            ].map((reward) => (
              <div key={reward.name} className="p-4 rounded-lg border border-border hover:border-primary transition-colors flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{reward.name}</p>
                  <p className="text-xs text-muted-foreground">{reward.cost}</p>
                  <p className="text-xs text-emerald-600 mt-1">{reward.savings}</p>
                </div>
                <Button size="sm" variant={currentPoints >= parseInt(reward.cost) ? "default" : "outline"} disabled={currentPoints < parseInt(reward.cost)}>
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reward History */}
      <Card>
        <CardHeader>
          <CardTitle>Reward History</CardTitle>
          <CardDescription>Your recent points activity</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={rewardHistory}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page: 1, pageSize: 10, total: rewardHistory.length, onPageChange: () => {} }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
