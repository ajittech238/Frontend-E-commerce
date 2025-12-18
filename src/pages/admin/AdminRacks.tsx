import { useState } from "react";
import { Plus, Search, Box, Package, AlertTriangle, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const racks = [
  { id: "R001", identifier: "A-01-01", warehouse: "Central Warehouse", location: "Aisle A, Row 1", capacity: 500, used: 450, products: 12, status: "full" },
  { id: "R002", identifier: "A-01-02", warehouse: "Central Warehouse", location: "Aisle A, Row 1", capacity: 500, used: 320, products: 8, status: "available" },
  { id: "R003", identifier: "A-02-01", warehouse: "Central Warehouse", location: "Aisle A, Row 2", capacity: 500, used: 500, products: 15, status: "full" },
  { id: "R004", identifier: "B-01-01", warehouse: "West Coast Hub", location: "Aisle B, Row 1", capacity: 400, used: 150, products: 5, status: "available" },
  { id: "R005", identifier: "B-01-02", warehouse: "West Coast Hub", location: "Aisle B, Row 1", capacity: 400, used: 0, products: 0, status: "empty" },
  { id: "R006", identifier: "C-01-01", warehouse: "Midwest Center", location: "Aisle C, Row 1", capacity: 300, used: 290, products: 10, status: "warning" },
];

export default function AdminRacks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      full: "bg-destructive/10 text-destructive border-destructive/20",
      empty: "bg-muted text-muted-foreground border-border",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rack Management</h1>
          <p className="text-muted-foreground">Manage warehouse racks and storage locations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Rack</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Rack</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rack Identifier</Label>
                  <Input placeholder="A-01-01" />
                </div>
                <div className="space-y-2">
                  <Label>Warehouse</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select warehouse" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Warehouse</SelectItem>
                      <SelectItem value="west">West Coast Hub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Aisle A, Row 1" />
              </div>
              <div className="space-y-2">
                <Label>Capacity (units)</Label>
                <Input type="number" placeholder="500" />
              </div>
              <Button className="w-full">Create Rack</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Racks</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{racks.length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{racks.filter(r => r.status === "available").length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Near Capacity</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{racks.filter(r => r.status === "warning" || r.status === "full").length}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{racks.reduce((a, r) => a + r.products, 0)}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search racks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Warehouses" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="central">Central Warehouse</SelectItem>
                <SelectItem value="west">West Coast Hub</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identifier</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {racks.map((rack) => (
                <TableRow key={rack.id}>
                  <TableCell className="font-medium">{rack.identifier}</TableCell>
                  <TableCell>{rack.warehouse}</TableCell>
                  <TableCell>{rack.location}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{rack.used} / {rack.capacity}</div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden w-20">
                        <div className={`h-full ${rack.status === "full" ? "bg-destructive" : rack.status === "warning" ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${(rack.used / rack.capacity) * 100}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{rack.products}</TableCell>
                  <TableCell>{getStatusBadge(rack.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Products</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
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
