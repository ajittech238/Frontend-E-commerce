import { useState } from "react";
import { Search, Package, Box, MapPin, Edit, Trash2, MoreHorizontal, ArrowUpDown, Filter, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const warehouseProducts = [
  { id: "WP-001", sku: "SKU-IPH-15", name: "iPhone 15 Pro", warehouse: "Central Warehouse", category: "Electronics", quantity: 150, location: "RACK-A1", status: "available" },
  { id: "WP-002", sku: "SKU-SAM-S24", name: "Samsung S24 Ultra", warehouse: "Central Warehouse", category: "Electronics", quantity: 8, location: "RACK-A2", status: "low-stock" },
  { id: "WP-003", sku: "SKU-MAC-M3", name: "MacBook Pro M3", warehouse: "West Coast Hub", category: "Electronics", quantity: 45, location: "RACK-B1", status: "available" },
  { id: "WP-004", sku: "SKU-SON-XM5", name: "Sony Headphones", warehouse: "Midwest Center", category: "Electronics", quantity: 0, location: "RACK-C3", status: "out-of-stock" },
  { id: "WP-005", sku: "SKU-LOG-MX3", name: "Logitech MX Master 3", warehouse: "West Coast Hub", category: "Accessories", quantity: 200, location: "RACK-D1", status: "available" },
];

export default function AdminWarehouseProducts() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "low-stock": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "out-of-stock": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status.replace("-", " ")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouse Inventory</h1>
          <p className="text-muted-foreground">Manage and monitor all products across warehouse locations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button><Package className="h-4 w-4 mr-2" />Add Inventory</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Total Units</CardHeader>
          <CardContent><div className="text-2xl font-bold">145,280</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Unique SKUs</CardHeader>
          <CardContent><div className="text-2xl font-bold">2,450</div></CardContent>
        </Card>
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Low Stock Alerts <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-amber-600">38</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground">Valuation</CardHeader>
          <CardContent><div className="text-2xl font-bold">₹12.4Cr</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by SKU, Product Name or Warehouse..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Info</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warehouseProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.sku}</div>
                  </TableCell>
                  <TableCell><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{product.warehouse}</div></TableCell>
                  <TableCell><div className="flex items-center gap-2 font-mono text-xs"><Box className="h-4 w-4 text-muted-foreground" />{product.location}</div></TableCell>
                  <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                  <TableCell className="font-bold">{product.quantity.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit Details</DropdownMenuItem>
                        <DropdownMenuItem><ArrowUpDown className="h-4 w-4 mr-2" />Stock Adjustment</DropdownMenuItem>
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
