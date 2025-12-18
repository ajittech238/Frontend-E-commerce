import { useState } from "react";
import { ArrowLeft, RefreshCw, Settings, Package, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const syncedProducts = [
  { sku: "AMZ-001", name: "Wireless Headphones", amazonPrice: 79.99, localPrice: 79.99, stock: 150, status: "synced" },
  { sku: "AMZ-002", name: "Smart Watch Pro", amazonPrice: 199.99, localPrice: 189.99, stock: 45, status: "price-mismatch" },
  { sku: "AMZ-003", name: "Bluetooth Speaker", amazonPrice: 49.99, localPrice: 49.99, stock: 0, status: "out-of-stock" },
];

const recentOrders = [
  { orderId: "114-1234567-8901234", product: "Wireless Headphones", qty: 2, total: 159.98, status: "shipped", date: "2024-12-12" },
  { orderId: "114-2345678-9012345", product: "Smart Watch Pro", qty: 1, total: 199.99, status: "pending", date: "2024-12-11" },
];

export default function AmazonIntegration() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      synced: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "price-mismatch": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
      shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status.replace("-", " ")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/integrations")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Amazon Seller Central</h1>
          <p className="text-muted-foreground">Manage your Amazon marketplace integration</p>
        </div>
        <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-emerald-500" : ""}>
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,456</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+18% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">156</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Last Sync</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2m ago</div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Synced Products</CardTitle>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Sync Now</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amazon Price</TableHead>
                    <TableHead>Local Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncedProducts.map((product) => (
                    <TableRow key={product.sku}>
                      <TableCell className="font-medium">{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.amazonPrice}</TableCell>
                      <TableCell>${product.localPrice}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell className="font-mono text-sm">{order.orderId}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.qty}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure your Amazon Seller Central API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Seller ID</Label>
                  <Input placeholder="A1B2C3D4E5F6G7" />
                </div>
                <div className="space-y-2">
                  <Label>Marketplace ID</Label>
                  <Input placeholder="ATVPDKIKX0DER" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Access Key</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Secret Key</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Sync Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync products and orders</p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Price Sync</Label>
                  <p className="text-sm text-muted-foreground">Sync prices from Amazon to local</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Inventory Sync</Label>
                  <p className="text-sm text-muted-foreground">Update inventory levels automatically</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
