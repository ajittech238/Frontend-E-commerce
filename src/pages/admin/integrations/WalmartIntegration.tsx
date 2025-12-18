import { useState } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, Package, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const items = [
  { sku: "WMT-001", name: "Home Essentials Kit", price: 49.99, inventory: 500, fulfillment: "WFS", status: "published" },
  { sku: "WMT-002", name: "Kitchen Appliance Set", price: 129.99, inventory: 150, fulfillment: "Seller", status: "published" },
  { sku: "WMT-003", name: "Garden Tools Bundle", price: 79.99, inventory: 0, fulfillment: "WFS", status: "unpublished" },
];

export default function WalmartIntegration() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      unpublished: "bg-muted text-muted-foreground border-border",
      retired: "bg-destructive/10 text-destructive border-destructive/20",
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
          <h1 className="text-2xl font-bold text-foreground">Walmart Marketplace</h1>
          <p className="text-muted-foreground">Manage your Walmart seller account</p>
        </div>
        <Badge className="bg-emerald-500">Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-600/10 to-blue-600/5 border-blue-600/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,456</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+28% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Items</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">189</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Seller Score</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-500">Excellent</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">WFS Items</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45</div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Listed Items</CardTitle>
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
                    <TableHead>Fulfillment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.sku}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.inventory}</TableCell>
                      <TableCell><Badge variant="secondary">{item.fulfillment}</Badge></TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
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
              <CardTitle>Walmart Configuration</CardTitle>
              <CardDescription>Configure your Walmart Marketplace credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Client ID</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Client Secret</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label>Use WFS (Walmart Fulfillment Services)</Label>
                  <p className="text-sm text-muted-foreground">Enable Walmart's fulfillment for eligible items</p>
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
