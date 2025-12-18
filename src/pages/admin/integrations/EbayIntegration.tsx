import { useState } from "react";
import { ArrowLeft, RefreshCw, TrendingUp, Gavel, Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const listings = [
  { id: "EBY-001", title: "Vintage Watch Collection", price: 299.99, bids: 12, watchers: 45, endDate: "2024-12-15", status: "active" },
  { id: "EBY-002", title: "Rare Comic Book Set", price: 150.00, bids: 5, watchers: 23, endDate: "2024-12-18", status: "active" },
  { id: "EBY-003", title: "Antique Furniture Piece", price: 450.00, bids: 0, watchers: 8, endDate: "2024-12-10", status: "ended" },
];

export default function EbayIntegration() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      ended: "bg-muted text-muted-foreground border-border",
      sold: "bg-blue-500/10 text-blue-500 border-blue-500/20",
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
          <h1 className="text-2xl font-bold text-foreground">eBay</h1>
          <p className="text-muted-foreground">Manage your eBay seller account</p>
        </div>
        <Badge className="bg-emerald-500">Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,945</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+15% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Gavel className="h-5 w-5 text-muted-foreground" /><span className="text-2xl font-bold">67</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Seller Rating</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" /><span className="text-2xl font-bold">4.9</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Shipments</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Package className="h-5 w-5 text-muted-foreground" /><span className="text-2xl font-bold">12</span></div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings">
        <TabsList>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Listings</CardTitle>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Sync</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Bids</TableHead>
                    <TableHead>Watchers</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.id}</TableCell>
                      <TableCell>{listing.title}</TableCell>
                      <TableCell>${listing.price}</TableCell>
                      <TableCell>{listing.bids}</TableCell>
                      <TableCell>{listing.watchers}</TableCell>
                      <TableCell>{listing.endDate}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
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
              <CardTitle>eBay Configuration</CardTitle>
              <CardDescription>Configure your eBay seller account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>App ID (Client ID)</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Dev ID</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Cert ID (Client Secret)</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label>Auto End Listings</Label>
                  <p className="text-sm text-muted-foreground">Auto-end unsold listings after expiry</p>
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
