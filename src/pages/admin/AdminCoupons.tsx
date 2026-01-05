import { useState, ReactNode } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2, Copy, Percent, DollarSign, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Minus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  minCart: number;
  usageLimit: number | null;
  usedCount: number;
  startsAt: string;
  endsAt: string;
  status: string;
}

const mockCoupons: Coupon[] = [
  { id: "1", code: "SAVE20", type: "percent", value: 20, minCart: 500, usageLimit: 100, usedCount: 45, startsAt: "2024-01-01", endsAt: "2024-12-31", status: "active" },
  { id: "2", code: "FLAT100", type: "fixed", value: 100, minCart: 1000, usageLimit: 50, usedCount: 50, startsAt: "2024-01-01", endsAt: "2024-06-30", status: "inactive" },
  { id: "3", code: "WELCOME10", type: "percent", value: 10, minCart: 0, usageLimit: null, usedCount: 234, startsAt: "2024-01-01", endsAt: "2024-12-31", status: "active" },
  { id: "4", code: "SUMMER25", type: "percent", value: 25, minCart: 2000, usageLimit: 200, usedCount: 89, startsAt: "2024-06-01", endsAt: "2024-08-31", status: "active" },
];

export default function AdminCoupons() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Coupon | null>(null);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [expandedRows, setExpandedRows] = useState(new Set<string>());

  const filteredData = mockCoupons.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );
  
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const getRowId = (item: Coupon) => item.id;

  const allSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.includes(getRowId(item)));
  const someSelected = paginatedData.some((item) => selectedIds.includes(getRowId(item)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedData.map(getRowId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderExpandedRow = (item: Coupon) => (
    <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-3 p-4">
        <Label className="text-xs font-medium text-muted-foreground self-center">Min Cart</Label>
        <div className="text-sm">{item.minCart > 0 ? `₹${item.minCart}` : <span className="text-muted-foreground">—</span>}</div>
        
        <Label className="text-xs font-medium text-muted-foreground self-center">Usage</Label>
        <div className="space-y-1 min-w-[100px]">
          <div className="flex justify-between text-xs">
            <span>{item.usedCount}</span>
            <span className="text-muted-foreground">{item.usageLimit || "∞"}</span>
          </div>
          {item.usageLimit && <Progress value={(item.usedCount / item.usageLimit) * 100} className="h-1.5" />}
        </div>
        
        <Label className="text-xs font-medium text-muted-foreground self-center">Validity</Label>
        <div className="text-sm">{new Date(item.endsAt).toLocaleDateString()}</div>
        
        <Label className="text-xs font-medium text-muted-foreground self-center">Status</Label>
        <div className="text-sm"><StatusBadge status={item.status} /></div>

        <Label className="text-xs font-medium text-muted-foreground self-center">Actions</Label>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Actions <MoreHorizontal className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Usage</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>
                <Edit className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </div>
  );

  const columns = [
    {
      key: "code",
      header: "Coupon Code",
      render: (item: Coupon) => (
        <div className="flex items-center gap-2">
          <code className="px-2 py-1 bg-pink-gradient/10 text-primary rounded font-mono text-sm">{item.code}</code>
          <Button variant="ghost" size="icon" className="w-6 h-6">
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "discount",
      header: "Discount",
      render: (item: Coupon) => (
        <div className="flex items-center gap-1">
          {item.type === "percent" ? <Percent className="w-4 h-4 text-muted-foreground" /> : <DollarSign className="w-4 h-4 text-muted-foreground" />}
          <span className="font-medium text-xs sm:text-sm">
            {item.type === "percent" ? `${item.value}%` : `₹${item.value}`}
          </span>
        </div>
      ),
    },
    {
      key: "minCart",
      header: "Min Cart",
      className: "hidden md:table-cell",
      render: (item: Coupon) => item.minCart > 0 ? `₹${item.minCart}` : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "usage",
      header: "Usage",
      className: "hidden md:table-cell",
      render: (item: Coupon) => (
        <div className="space-y-1 min-w-[100px]">
          <div className="flex justify-between text-xs">
            <span>{item.usedCount}</span>
            <span className="text-muted-foreground">{item.usageLimit || "∞"}</span>
          </div>
          {item.usageLimit && <Progress value={(item.usedCount / item.usageLimit) * 100} className="h-1.5" />}
        </div>
      ),
    },
    {
      key: "validity",
      header: "Valid Until",
      className: "hidden lg:table-cell",
      render: (item: Coupon) => new Date(item.endsAt).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      className: "hidden lg:table-cell",
      render: (item: Coupon) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "hidden lg:table-cell",
      width: "60px",
      render: (item: Coupon) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Usage</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      key: "expander",
      header: "",
      width: "50px",
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in min-h-[calc(100vh-80px)] pb-10">
      <AdminPageHeader
        title="Coupons"
        description="Manage discount codes and promotions"
        searchPlaceholder="Search coupons..."
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => { setEditingItem(null); setIsDialogOpen(true); }}
        addLabel="Add Coupon"
        onExport={() => {}}
      />

      <div className="space-y-4">
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                      className={someSelected && !allSelected ? "data-[state=checked]:bg-pink-gradient/50" : ""}
                    />
                  </TableHead>
                  {columns.map((col) => {
                    const isExpandCol = col.key === "expander";
                    return (
                      <TableHead
                        key={col.key}
                        style={{ width: col.width }}
                        className={`${col.className || ''} ${
                          isExpandCol ? "lg:hidden" : ""
                        } font-semibold text-foreground text-xs sm:text-sm`}
                      >
                        {isExpandCol ? "" : col.header}
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="h-24 sm:h-32 text-center text-xs sm:text-sm text-muted-foreground"
                    >
                      No coupons found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => {
                    const id = getRowId(item);
                    const isSelected = selectedIds.includes(id);
                    const isExpanded = expandedRows.has(id);
                    return (
                      <>
                        <TableRow
                          key={id}
                          className={`transition-colors ${isSelected ? "bg-pink-gradient/5" : ""}`}
                        >
                          <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleSelectRow(id, !!checked)}
                              aria-label={`Select row ${id}`}
                            />
                          </TableCell>
                          {columns.map((col) => {
                            const isExpandCol = col.key === "expander";
                             let cellContent: ReactNode;
 
                             if (isExpandCol) {
                               cellContent = (
                                 <Button
                                   variant="ghost"
                                   size="sm"
                                   className="h-8 w-8 p-0"
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     toggleExpand(id);
                                   }}
                                 >
                                   {isExpanded ? (
                                     <Minus className="h-4 w-4 text-primary" />
                                   ) : (
                                     <Plus className="h-4 w-4 text-primary" />
                                   )}
                                 </Button>
                               );
                             } else {
                               cellContent = col.render ? col.render(item) : (item as unknown as Record<string, unknown>)[col.key] as ReactNode;
                             }
                            return (
                              <TableCell
                                key={col.key}
                                style={{ width: col.width }}
                                className={`${col.className || ''} ${isExpandCol ? 'lg:hidden' : ''} text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words`}
                              >
                                {cellContent}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                         {isExpanded && (
                            <TableRow className="lg:hidden border-l-4 border-primary bg-muted/20 hover:bg-muted/30 rounded-lg">
                                <TableCell colSpan={columns.length+1} className="p-0">
                                    {renderExpandedRow(item)}
                                </TableCell>
                            </TableRow>
                        )}
                      </>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs sm:text-sm">
          <p className="text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, filteredData.length)} of{" "}
            {filteredData.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === 1}
              title="First page"
            >
              <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              title="Previous page"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <span className="px-2 sm:px-3 font-medium text-xs sm:text-sm">
              {pagination.page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              title="Next page"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => handlePageChange(totalPages)}
              disabled={pagination.page === totalPages}
              title="Last page"
            >
              <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update coupon details" : "Create a new discount coupon"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Coupon Code</Label>
              <Input id="code" defaultValue={editingItem?.code} placeholder="SAVE20" className="uppercase" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select defaultValue={editingItem?.type || "percent"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Value</Label>
                <Input id="value" type="number" defaultValue={editingItem?.value} placeholder="20" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minCart">Min Cart Value</Label>
                <Input id="minCart" type="number" defaultValue={editingItem?.minCart} placeholder="500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input id="usageLimit" type="number" defaultValue={editingItem?.usageLimit || ""} placeholder="100" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startsAt">Start Date</Label>
                <Input id="startsAt" type="date" defaultValue={editingItem?.startsAt} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endsAt">End Date</Label>
                <Input id="endsAt" type="date" defaultValue={editingItem?.endsAt} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingItem ? "Save Changes" : "Create Coupon"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
