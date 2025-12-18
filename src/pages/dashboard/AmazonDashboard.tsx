import { TrendingUp, AlertCircle, CheckCircle2, Package, DollarSign, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const products = [
  { id: "A001", name: "Wireless Headphones", status: "active", listing: "Approved", sales: 1204, revenue: "₹2,40,800", rating: 4.5 },
  { id: "A002", name: "Smart Watch", status: "active", listing: "Approved", sales: 856, revenue: "₹1,71,200", rating: 4.2 },
  { id: "A003", name: "USB Cable", status: "pending", listing: "Under Review", sales: 0, revenue: "₹0", rating: 0 },
];

export default function AmazonDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Amazon Integration</h1>
          <p className="text-muted-foreground mt-1">Manage your Amazon seller account</p>
        </div>
        <Badge className="bg-amber-500/10 text-amber-600 text-base px-4 py-2">Connected</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Listings", value: "2", icon: Package, color: "from-amber-500 to-orange-500" },
          { label: "Total Sales", value: "2,060", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
          { label: "Revenue", value: "₹4,12,000", icon: DollarSign, color: "from-blue-500 to-cyan-500" },
          { label: "Pending Review", value: "1", icon: AlertCircle, color: "from-purple-500 to-pink-500" },
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

      {/* Products */}
      <Card>
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>Products synced to Amazon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{product.id}</Badge>
                    <Badge className={product.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                      {product.listing}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{product.revenue}</p>
                  <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                </div>
              </div>
              {product.status === "active" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">{product.rating} ⭐</span>
                  </div>
                  <Progress value={product.rating * 20} className="h-1.5" />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Amazon seller account configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Seller ID</p>
              <code className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">AMZ123456789</code>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Account Status</p>
              <Badge className="bg-emerald-500/10 text-emerald-600">Active & Good Standing</Badge>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Sync Frequency</p>
              <p className="text-sm text-muted-foreground">Every 6 hours</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Last Sync</p>
              <p className="text-sm text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline">Sync Now</Button>
            <Button variant="outline">Settings</Button>
            <Button variant="outline" className="text-destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
