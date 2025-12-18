import { Store, TrendingUp, Users, ShoppingCart, DollarSign, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const collections = [
  { id: "S001", name: "Featured Products", products: 45, status: "active", sales: 3400, revenue: "₹6,80,000" },
  { id: "S002", name: "Summer Collection", products: 32, status: "active", sales: 2100, revenue: "₹4,20,000" },
  { id: "S003", name: "Clearance", products: 18, status: "active", sales: 1200, revenue: "₹1,80,000" },
];

export default function ShopifyDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shopify Integration</h1>
          <p className="text-muted-foreground mt-1">Manage your Shopify store</p>
        </div>
        <Badge className="bg-green-500/10 text-green-600 text-base px-4 py-2">Connected</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: "95", icon: Store, color: "from-green-500 to-emerald-500" },
          { label: "Collections", value: "3", icon: ShoppingCart, color: "from-blue-500 to-cyan-500" },
          { label: "Total Sales", value: "6,700", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
          { label: "Revenue", value: "₹12,80,000", icon: DollarSign, color: "from-amber-500 to-orange-500" },
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

      {/* Collections */}
      <Card>
        <CardHeader>
          <CardTitle>Collections</CardTitle>
          <CardDescription>Product collections in your Shopify store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {collections.map((collection) => (
            <div key={collection.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">{collection.name}</p>
                  <p className="text-sm text-muted-foreground">{collection.products} products</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{collection.revenue}</p>
                  <p className="text-sm text-muted-foreground">{collection.sales} sales</p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-600">{collection.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Store Info */}
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Shopify store configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Store URL</p>
              <code className="text-xs text-blue-600 underline cursor-pointer">https://craftsy.myshopify.com</code>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Plan</p>
              <Badge className="bg-green-500/10 text-green-600">Shopify Plus</Badge>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Orders Synced</p>
              <p className="text-sm text-muted-foreground">12,345 orders</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm font-medium text-foreground mb-2">Sync Status</p>
              <Badge className="bg-emerald-500/10 text-emerald-600">In Sync</Badge>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline">Sync Orders</Button>
            <Button variant="outline">View Store</Button>
            <Button variant="outline" className="text-destructive">Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Conversion Rate", value: "3.2%", target: 5 },
            { label: "Cart Abandonment", value: "68%", target: 60 },
            { label: "Inventory Status", value: "92%", target: 95 },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
                <span className="text-sm font-semibold text-foreground">{metric.value}</span>
              </div>
              <Progress value={parseFloat(metric.value)} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
