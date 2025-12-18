import { useState } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, Globe, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Premium WordPress Theme", type: "simple", price: 59.00, stock: "instock", status: "publish" },
  { id: 2, name: "SEO Plugin Bundle", type: "variable", price: 99.00, stock: "instock", status: "publish" },
  { id: 3, name: "Custom Development Hours", type: "simple", price: 150.00, stock: "instock", status: "draft" },
];

export default function WooCommerceIntegration() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      publish: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      draft: "bg-muted text-muted-foreground border-border",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/integrations")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">WooCommerce</h1>
          <p className="text-muted-foreground">Manage your WooCommerce store integration</p>
        </div>
        <Badge className="bg-emerald-500">Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,234</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+19% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-muted-foreground" /><span className="text-2xl font-bold">156</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Customers</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Users className="h-5 w-5 text-muted-foreground" /><span className="text-2xl font-bold">892</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Site Status</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Globe className="h-5 w-5 text-emerald-500" /><span className="text-2xl font-bold">Online</span></div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Synced Products</CardTitle>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Sync</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">#{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell><Badge variant="secondary">{product.type}</Badge></TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell><Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">{product.stock}</Badge></TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>WooCommerce Configuration</CardTitle>
              <CardDescription>Configure your WooCommerce REST API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Store URL</Label>
                <Input placeholder="https://your-store.com" />
              </div>
              <div className="space-y-2">
                <Label>Consumer Key</Label>
                <Input type="password" placeholder="ck_••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Consumer Secret</Label>
                <Input type="password" placeholder="cs_••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label>Webhook Sync</Label>
                  <p className="text-sm text-muted-foreground">Receive real-time updates via webhooks</p>
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
