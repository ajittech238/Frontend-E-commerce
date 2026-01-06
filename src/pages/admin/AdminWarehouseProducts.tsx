import { useState } from "react";
import { Search, Package, Box, MapPin, Edit, Trash2, MoreHorizontal, ArrowUpDown, Filter, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/admin/DataTable";
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

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Product",
      render: (product) => (
        <div className="max-w-[150px] sm:max-w-none">
          <div className="font-medium text-xs sm:text-sm truncate">{product.name}</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground">{product.sku}</div>
        </div>
      ),
    },
    {
      key: "warehouse",
      header: "Warehouse",
      className: "hidden md:table-cell",
      render: (product) => (
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="truncate max-w-[120px]">{product.warehouse}</span>
        </div>
      ),
    },
    {
      key: "location",
      header: "Loc",
      className: "hidden sm:table-cell",
      render: (product) => (
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs">
          <Box className="h-3.5 w-3.5 text-muted-foreground" />
          {product.location}
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      className: "hidden lg:table-cell",
      render: (product) => <Badge variant="outline" className="text-[10px] sm:text-xs">{product.category}</Badge>
    },
    {
      key: "quantity",
      header: "Qty",
      render: (product) => <span className="font-bold text-xs sm:text-sm">{product.quantity.toLocaleString()}</span>
    },
    {
      key: "status",
      header: "Status",
      className: "hidden xs:table-cell",
      render: (product) => getStatusBadge(product.status),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (product) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
              <DropdownMenuItem><ArrowUpDown className="h-4 w-4 mr-2" />Stock</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Remove</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredProducts = warehouseProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.warehouse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 px-1 xs:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Monitor products across locations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button size="sm" className="flex-1 sm:flex-none"><Package className="h-4 w-4 mr-2" />Add</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-0">
          <CardHeader className="p-4 pb-2"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Units</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0"><div className="text-xl sm:text-2xl font-bold">145,280</div></CardContent>
        </Card>
        <Card className="p-0">
          <CardHeader className="p-4 pb-2"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Unique SKUs</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0"><div className="text-xl sm:text-2xl font-bold">2,450</div></CardContent>
        </Card>
        <Card className="p-0 border-amber-500/20 bg-amber-500/5">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Low Stock</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0"><div className="text-xl sm:text-2xl font-bold text-amber-600">38</div></CardContent>
        </Card>
        <Card className="p-0">
          <CardHeader className="p-4 pb-2"><CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Valuation</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0"><div className="text-xl sm:text-2xl font-bold">₹12.4Cr</div></CardContent>
        </Card>
      </div>

      <Card className="mx-0">
        <CardHeader className="p-4 sm:p-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search inventory..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 text-xs sm:text-sm" />
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <DataTable
            columns={columns}
            data={filteredProducts}
            pagination={{
              page: 1,
              pageSize: 10,
              total: filteredProducts.length,
              onPageChange: () => {}
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
