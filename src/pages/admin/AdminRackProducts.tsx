import { useState } from "react";
import { Plus, Search, Package, Box, MapPin, Edit, Trash2, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const rackProducts = [
  { id: "RP001", productName: "iPhone 15 Pro", rackId: "RACK-A1", warehouse: "Central Warehouse", quantity: 50, minQuantity: 10, status: "in-stock" },
  { id: "RP002", productName: "Samsung S24", rackId: "RACK-A2", warehouse: "Central Warehouse", quantity: 5, minQuantity: 15, status: "low-stock" },
  { id: "RP003", productName: "MacBook Pro", rackId: "RACK-B1", warehouse: "West Coast Hub", quantity: 20, minQuantity: 5, status: "in-stock" },
  { id: "RP004", productName: "Sony WH-1000XM5", rackId: "RACK-C3", warehouse: "Midwest Center", quantity: 0, minQuantity: 10, status: "out-of-stock" },
  { id: "RP005", productName: "Dell XPS 15", rackId: "RACK-B2", warehouse: "West Coast Hub", quantity: 12, minQuantity: 8, status: "in-stock" },
];

export default function AdminRackProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "in-stock": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "low-stock": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status.replace("-", " ")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rack Products</h1>
          <p className="text-muted-foreground">Manage products assigned to specific warehouse racks</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Assign Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Product to Rack</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Product</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iphone">iPhone 15 Pro</SelectItem>
                    <SelectItem value="samsung">Samsung S24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Rack</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select rack" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a1">RACK-A1</SelectItem>
                    <SelectItem value="a2">RACK-A2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="Enter quantity" />
              </div>
              <Button className="w-full">Assign Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Assigned Products</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,250</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-amber-500">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Movements</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">458</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search rack products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Rack ID</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rackProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell><div className="flex items-center gap-2"><Box className="h-4 w-4 text-muted-foreground" />{item.rackId}</div></TableCell>
                  <TableCell><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{item.warehouse}</div></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {item.quantity}
                      {item.quantity <= item.minQuantity && <ArrowDownRight className="h-4 w-4 text-amber-500" />}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Adjust Stock</DropdownMenuItem>
                        <DropdownMenuItem><ArrowUpRight className="h-4 w-4 mr-2" />Move to Rack</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
