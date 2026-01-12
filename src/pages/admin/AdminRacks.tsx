import { useState } from "react";
import { Plus, Search, Box, Package, AlertTriangle, MoreHorizontal, Eye, Edit, Trash2, ChevronDown, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const initialRacks = [
  { id: "R001", identifier: "A-01-01", warehouse: "Central Warehouse", location: "Aisle A, Row 1", capacity: 500, used: 450, products: 12, status: "full" },
  { id: "R002", identifier: "A-01-02", warehouse: "Central Warehouse", location: "Aisle A, Row 1", capacity: 500, used: 320, products: 8, status: "available" },
  { id: "R003", identifier: "A-02-01", warehouse: "Central Warehouse", location: "Aisle A, Row 2", capacity: 500, used: 500, products: 15, status: "full" },
  { id: "R004", identifier: "B-01-01", warehouse: "West Coast Hub", location: "Aisle B, Row 1", capacity: 400, used: 150, products: 5, status: "available" },
  { id: "R005", identifier: "B-01-02", warehouse: "West Coast Hub", location: "Aisle B, Row 1", capacity: 400, used: 0, products: 0, status: "empty" },
  { id: "R006", identifier: "C-01-01", warehouse: "Midwest Center", location: "Aisle C, Row 1", capacity: 300, used: 290, products: 10, status: "warning" },
];

export default function AdminRacks() {
  const [racks, setRacks] = useState(initialRacks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRack, setSelectedRack] = useState<any>(null);
  const [editRack, setEditRack] = useState<any>(null);

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleViewDetails = (rack: any) => {
    setSelectedRack(rack);
    setIsViewDetailsOpen(true);
  };

  const handleEdit = (rack: any) => {
    setEditRack({ ...rack });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (editRack) {
      setRacks(prev => prev.map(r => r.id === editRack.id ? editRack : r));
    }
    setIsEditOpen(false);
    setEditRack(null);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      full: "bg-destructive/10 text-destructive border-destructive/20",
      empty: "bg-muted text-muted-foreground border-border",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  const renderExpandedRow = (rack: any) => (
    <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">
      <div className="bg-card p-3 rounded border">
        <p className="text-xs text-muted-foreground">Warehouse</p>
        <p className="text-sm font-medium">{rack.warehouse}</p>
      </div>

      <div className="bg-card p-3 rounded border">
        <p className="text-xs text-muted-foreground">Location</p>
        <p className="text-sm font-medium">{rack.location}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Capacity</p>
          <div className="space-y-1">
            <div className="text-sm">{rack.used} / {rack.capacity}</div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden w-full">
              <div
                className={`h-full ${rack.status === "full" ? "bg-destructive" : rack.status === "warning" ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${(rack.used / rack.capacity) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Products</p>
          <p className="text-sm font-medium">{rack.products}</p>
        </div>
      </div>

      <div className="bg-card p-2 rounded border flex justify-between items-center">
        <div>
          <p className="text-xs text-muted-foreground">Status</p>
          {getStatusBadge(rack.status)}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-1/2 justify-start px-1">
              <MoreHorizontal className="w-4 h-4 mr-2" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetails(rack)}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(rack)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

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
          <DialogContent className="w-[90vw] rounded-md">
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
                      <SelectItem value="Central Warehouse">Central Warehouse</SelectItem>
                      <SelectItem value="West Coast Hub">West Coast Hub</SelectItem>
                      <SelectItem value="Midwest Center">Midwest Center</SelectItem>
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

                {/* MD+ */}
                <TableHead className="hidden md:table-cell">Warehouse</TableHead>

                {/* LG+ */}
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Capacity</TableHead>
                <TableHead className="hidden lg:table-cell">Products</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Actions</TableHead>

                {/* Chevron */}
                <TableHead className="w-10 lg:hidden" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {racks.map((rack) => {
                const isExpanded = expandedRows.has(rack.id);
                return (
                  <>
                    <TableRow key={rack.id}>
                      <TableCell className="font-medium">{rack.identifier}</TableCell>
                      <TableCell className="hidden md:table-cell">{rack.warehouse}</TableCell>
                      <TableCell className="hidden lg:table-cell">{rack.location}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="space-y-1">
                          <div className="text-sm">{rack.used} / {rack.capacity}</div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden w-20">
                            <div
                              className={`h-full ${rack.status === "full" ? "bg-destructive" : rack.status === "warning" ? "bg-amber-500" : "bg-emerald-500"}`}
                              style={{ width: `${(rack.used / rack.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{rack.products}</TableCell>
                      <TableCell className="hidden lg:table-cell">{getStatusBadge(rack.status)}</TableCell>
                      <TableCell className="hidden lg:table-cell text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(rack)}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(rack)}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell className="lg:hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleExpand(rack.id)}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="lg:hidden">
                        <TableCell colSpan={8} className="p-0">
                          {renderExpandedRow(rack)}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] rounded-lg md:max-w-lg md:max-h-[80vh] shadow-lg flex flex-col">
          <DialogHeader className="p-6">
            <DialogTitle className="flex items-center text-2xl">
              <Package className="h-6 w-6 mr-3" />
              {selectedRack?.identifier}
            </DialogTitle>
            <DialogDescription>
              Rack ID: {selectedRack?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedRack && (
            <div className="px-6 pb-6 space-y-4 flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="p-4 bg-muted/50 rounded-lg border">
                <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  <Package className="h-4 w-4 mr-2" /> Warehouse
                </Label>
                <p className="text-base">{selectedRack.warehouse}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border">
                <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  Location
                </Label>
                <p className="text-base">{selectedRack.location}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <Box className="h-4 w-4 mr-2" /> Capacity
                  </Label>
                  <div className="space-y-1">
                    <p className="text-base font-medium">{selectedRack.used} / {selectedRack.capacity}</p>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden w-full">
                      <div
                        className={`h-full ${selectedRack.status === "full" ? "bg-destructive" : selectedRack.status === "warning" ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${(selectedRack.used / selectedRack.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    Products
                  </Label>
                  <p className="text-base font-medium">{selectedRack.products}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    Status
                  </Label>
                  {getStatusBadge(selectedRack.status)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="p-4 border-t mt-auto">
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-[95vw] rounded-md md:max-w-lg h-[85vh]">
          <DialogHeader>
            <DialogTitle>Edit Rack</DialogTitle>
            <DialogDescription>
              Update the details for {editRack?.identifier}.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {editRack && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="identifier">Rack Identifier</Label>
                  <Input
                    id="identifier"
                    value={editRack.identifier || ""}
                    onChange={(e) => setEditRack({ ...editRack, identifier: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="warehouse">Warehouse</Label>
                  <Select value={editRack.warehouse || ""} onValueChange={(value) => setEditRack({ ...editRack, warehouse: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Central Warehouse">Central Warehouse</SelectItem>
                      <SelectItem value="West Coast Hub">West Coast Hub</SelectItem>
                      <SelectItem value="Midwest Center">Midwest Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editRack.location || ""}
                    onChange={(e) => setEditRack({ ...editRack, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={editRack.capacity || ""}
                      onChange={(e) => setEditRack({ ...editRack, capacity: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="used">Used</Label>
                    <Input
                      id="used"
                      type="number"
                      value={editRack.used || ""}
                      onChange={(e) => setEditRack({ ...editRack, used: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="products">Products</Label>
                    <Input
                      id="products"
                      type="number"
                      value={editRack.products || ""}
                      onChange={(e) => setEditRack({ ...editRack, products: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={editRack.status || ""} onValueChange={(value) => setEditRack({ ...editRack, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="empty">Empty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="gap-1">
            <Button variant="outline" onClick={() => { setIsEditOpen(false); setEditRack(null); }}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}