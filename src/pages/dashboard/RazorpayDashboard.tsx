import { CreditCard, TrendingUp, DollarSign, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const transactions = [
  { id: "TXN001", amount: "₹5,000", method: "Card", status: "success", date: "2024-01-25 10:30 AM" },
  { id: "TXN002", amount: "₹2,500", method: "UPI", status: "success", date: "2024-01-25 09:15 AM" },
  { id: "TXN003", amount: "₹10,000", method: "NetBanking", status: "pending", date: "2024-01-25 08:45 AM" },
];

export default function RazorpayDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Razorpay Integration</h1>
          <p className="text-muted-foreground mt-1">Manage payments and transactions</p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-600 text-base px-4 py-2">Connected</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Transactions", value: "2,345", icon: CreditCard, color: "from-blue-500 to-cyan-500" },
          { label: "Total Revenue", value: "₹56,78,000", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
          { label: "Success Rate", value: "99.2%", icon: CheckCircle2, color: "from-green-500 to-emerald-500" },
          { label: "Pending", value: "₹1,25,000", icon: Clock, color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <Card key={stat.label} className={`bg-gradient-to-br ${stat.color}/10 border-0`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment transactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{txn.amount}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{txn.method}</Badge>
                    <span className="text-xs text-muted-foreground">{txn.date}</span>
                  </div>
                </div>
              </div>
              <Badge className={txn.status === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                {txn.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Accepted payment modes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Credit Cards", status: "enabled", volume: "₹23,45,000" },
              { name: "Debit Cards", status: "enabled", volume: "₹18,92,000" },
              { name: "UPI", status: "enabled", volume: "₹12,34,000" },
              { name: "NetBanking", status: "enabled", volume: "₹8,56,000" },
              { name: "Wallet", status: "disabled", volume: "₹0" },
              { name: "EMI", status: "enabled", volume: "₹3,45,000" },
            ].map((method) => (
              <div key={method.name} className="p-4 rounded-lg bg-accent/30 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{method.name}</p>
                  <Badge className={method.status === "enabled" ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600"}>
                    {method.status}
                  </Badge>
                </div>
                {method.status === "enabled" && (
                  <p className="text-sm text-muted-foreground">{method.volume}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Key ID</p>
              <code className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">rzp_live_XXX...</code>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Settlement Cycle</p>
              <p className="text-sm text-muted-foreground">Daily</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Webhook Status</p>
              <Badge className="bg-emerald-500/10 text-emerald-600">Active</Badge>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Last Settlement</p>
              <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline">Test Payment</Button>
            <Button variant="outline">View Settings</Button>
            <Button variant="outline" className="text-destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      {/* Settlement Details */}
      <Card>
        <CardHeader>
          <CardTitle>Settlement Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-accent/30">
            <p className="text-sm font-medium text-foreground mb-2">Pending Amount</p>
            <p className="text-2xl font-bold text-foreground">₹1,25,000</p>
            <p className="text-xs text-muted-foreground mt-1">Will be settled by 2024-01-26</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Settlement Progress</span>
              <span className="text-sm font-semibold">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
