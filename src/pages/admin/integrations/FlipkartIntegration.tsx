import { useState } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, IndianRupee, Package, Star } from "lucide-react";
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
  { sku: "FLK-001", name: "Smartphone Case", price: 499, inventory: 1500, rating: 4.5, status: "active" },
  { sku: "FLK-002", name: "Bluetooth Earbuds", price: 1999, inventory: 300, rating: 4.2, status: "active" },
  { sku: "FLK-003", name: "Power Bank 10000mAh", price: 899, inventory: 0, rating: 4.7, status: "inactive" },
];

export default function FlipkartIntegration() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      inactive: "bg-muted text-muted-foreground border-border",
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
          <h1 className="text-2xl font-bold text-foreground">Flipkart Seller Hub</h1>
          <p className="text-muted-foreground">Manage your Flipkart seller account</p>
        </div>
        <Badge className="bg-emerald-500">Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1"><IndianRupee className="h-5 w-5" />4,56,789</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+35% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">234</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Seller Rating</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500 fill-amber-500" /><span className="text-2xl font-bold">4.6</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">28</div></CardContent>
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
                <CardTitle>Listed Products</CardTitle>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Sync</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.sku}>
                      <TableCell className="font-medium">{product.sku}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="flex items-center gap-0.5"><IndianRupee className="h-3 w-3" />{product.price}</TableCell>
                      <TableCell>{product.inventory}</TableCell>
                      <TableCell><div className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-500 fill-amber-500" />{product.rating}</div></TableCell>
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
              <CardTitle>Flipkart Configuration</CardTitle>
              <CardDescription>Configure your Flipkart Seller Hub credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Application ID</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Application Secret</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label>Flipkart Assured</Label>
                  <p className="text-sm text-muted-foreground">Enable Flipkart Assured for eligible products</p>
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
