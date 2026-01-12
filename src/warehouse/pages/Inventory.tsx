import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Trash2, Filter, Download, MoreVertical, LayoutGrid, List } from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface InventoryItem {
  sku: string;
  barcode: string;
  productName: string;
  category: string;
  stockLevel: number;
  minLevel: number;
  location: string; // Zone-Rack-Shelf
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      sku: "SKU-1245",
      barcode: "890123456789",
      productName: "Cotton T-Shirt - L",
      category: "Apparel",
      stockLevel: 145,
      minLevel: 50,
      location: "Z1-R12-S3",
      status: "In Stock",
      lastUpdated: "2024-01-10",
    },
    {
      sku: "SKU-4321",
      barcode: "890123456790",
      productName: "Running Shoes - 9",
      category: "Footwear",
      stockLevel: 12,
      minLevel: 25,
      location: "Z2-R05-S1",
      status: "Low Stock",
      lastUpdated: "2024-01-12",
    },
    {
      sku: "SKU-9981",
      barcode: "890123456791",
      productName: "Ceramic Mug",
      category: "Home",
      stockLevel: 8,
      minLevel: 20,
      location: "Z3-R02-S4",
      status: "Low Stock",
      lastUpdated: "2024-01-11",
    },
    {
      sku: "SKU-5566",
      barcode: "890123456792",
      productName: "Wireless Mouse",
      category: "Electronics",
      stockLevel: 0,
      minLevel: 15,
      location: "Z1-R08-S2",
      status: "Out of Stock",
      lastUpdated: "2024-01-09",
    },
    {
      sku: "SKU-7788",
      barcode: "890123456793",
      productName: "Desk Lamp",
      category: "Home",
      stockLevel: 45,
      minLevel: 10,
      location: "Z3-R02-S5",
      status: "In Stock",
      lastUpdated: "2024-01-12",
    },
  ]);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.barcode.includes(searchTerm);
      const matchesCategory = filterCategory === "all" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [inventory, searchTerm, filterCategory]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">Manage stock levels, locations, and SKU details.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2 bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search SKU, Name, Barcode..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
              <Button 
                variant={viewMode === "table" ? "secondary" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "grid" ? "secondary" : "ghost"} 
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "table" ? (
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[100px]">SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.sku} className="hover:bg-slate-50/50">
                  <TableCell className="font-mono text-xs font-semibold">{item.sku}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-[10px] text-muted-foreground">{item.category} • {item.barcode}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{item.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-semibold">{item.stockLevel}</div>
                    <div className="text-[10px] text-muted-foreground">Min: {item.minLevel}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredInventory.map((item) => (
            <Card key={item.sku} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{item.sku}</Badge>
                    {getStatusBadge(item.status)}
                  </div>
                  <h3 className="font-bold text-sm mb-1 truncate">{item.productName}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{item.category}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Stock</p>
                      <p className="text-lg font-bold">{item.stockLevel}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">Location</p>
                      <p className="text-xs font-bold mt-1">{item.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-[10px] text-muted-foreground">Updated: {item.lastUpdated}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 text-xs">Edit</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
