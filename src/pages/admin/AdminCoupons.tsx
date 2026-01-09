import { useState, ReactNode } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2, Copy, Percent, DollarSign, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";
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
    <div className="bg-muted/50 dark:bg-muted/80 p-4 mx-2 my-1 rounded-lg border border-border/50 animate-in slide-in-from-top-2">
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-card p-3 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Min Cart</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              {item.minCart > 0 ? `₹${item.minCart}` : "—"}
            </p>
          </div>
          <div className="bg-card p-3 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Usage</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-2 justify-center">
              <span className="text-xs">{item.usedCount} / {item.usageLimit || "∞"}</span>
            </p>
            {item.usageLimit && <Progress value={(item.usedCount / item.usageLimit) * 100} className="h-1.5 mt-1" />}
          </div>
          <div className="bg-card p-3 rounded-md border border-border/30 flex flex-col items-center justify-center gap-2">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Valid Until</p>
            <p className="text-sm font-semibold text-foreground">{new Date(item.endsAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="bg-card p-3 rounded-md border border-border/30">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Status</p>
          <StatusBadge status={item.status} />
        </div>

        <div className="space-y-2 pt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Eye className="h-4 w-4 mr-2" /> View Usage
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingItem(item);
                  setIsDialogOpen(true);
                }}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      key: "code",
      header: "Coupon Code",
      width: "200px",
      showOnMobile: true,
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
      width: "120px",
      showOnMobile: true,
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
      width: "120px",
      showOnMobile: false,
      render: (item: Coupon) => item.minCart > 0 ? `₹${item.minCart}` : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "usage",
      header: "Usage",
      width: "150px",
      showOnMobile: false,
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
      width: "120px",
      showOnMobile: false,
      breakpoint: "lg",
      render: (item: Coupon) => new Date(item.endsAt).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      width: "100px",
      showOnMobile: false,
      breakpoint: "lg",
      render: (item: Coupon) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      showOnMobile: false,
      render: (item: Coupon) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Eye className="w-4 h-4 mr-2" /> View Usage
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditingItem(item);
                setIsDialogOpen(true);
              }}
            >
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
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
                  {columns.map((col) => (
                    <TableHead 
                      key={col.key} 
                      style={{ width: col.width }} 
                      className={`font-semibold text-foreground text-xs sm:text-sm ${col.showOnMobile === false ? `hidden ${(col as any).breakpoint || 'md'}:table-cell` : ''}`}
                    >
                      {col.header}
                    </TableHead>
                  ))}
                  <TableHead className="w-12 md:hidden">
                    <ChevronDown className="w-4 h-4" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 2}
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
                          {columns.map((col) => (
                            <TableCell
                              key={col.key}
                              style={{ width: col.width }}
                              className={`text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words ${col.showOnMobile === false ? `hidden ${(col as any).breakpoint || 'md'}:table-cell` : ''}`}
                            >
                              {col.render ? col.render(item) : item[col.key as keyof Coupon] as ReactNode}
                            </TableCell>
                          ))}
                          <TableCell className="w-12 lg:hidden">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => toggleExpand(id)}
                            >
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                        {isExpanded && (
                          <TableRow className="lg:hidden">
                            <TableCell colSpan={columns.length + 2} className="p-0">
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