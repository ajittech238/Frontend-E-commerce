import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2, Copy, Percent, DollarSign } from "lucide-react";
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

const mockCoupons = [
  { id: "1", code: "SAVE20", type: "percent", value: 20, minCart: 500, usageLimit: 100, usedCount: 45, startsAt: "2024-01-01", endsAt: "2024-12-31", status: "active" },
  { id: "2", code: "FLAT100", type: "fixed", value: 100, minCart: 1000, usageLimit: 50, usedCount: 50, startsAt: "2024-01-01", endsAt: "2024-06-30", status: "inactive" },
  { id: "3", code: "WELCOME10", type: "percent", value: 10, minCart: 0, usageLimit: null, usedCount: 234, startsAt: "2024-01-01", endsAt: "2024-12-31", status: "active" },
  { id: "4", code: "SUMMER25", type: "percent", value: 25, minCart: 2000, usageLimit: 200, usedCount: 89, startsAt: "2024-06-01", endsAt: "2024-08-31", status: "active" },
];

export default function AdminCoupons() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredData = mockCoupons.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "code",
      header: "Coupon Code",
      render: (item: any) => (
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
      render: (item: any) => (
        <div className="flex items-center gap-1">
          {item.type === "percent" ? <Percent className="w-4 h-4 text-muted-foreground" /> : <DollarSign className="w-4 h-4 text-muted-foreground" />}
          <span className="font-medium">
            {item.type === "percent" ? `${item.value}%` : `₹${item.value}`}
          </span>
        </div>
      ),
    },
    {
      key: "minCart",
      header: "Min Cart",
      render: (item: any) => item.minCart > 0 ? `₹${item.minCart}` : <span className="text-muted-foreground">—</span>,
    },
    {
      key: "usage",
      header: "Usage",
      render: (item: any) => (
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
      render: (item: any) => new Date(item.endsAt).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: any) => (
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
  ];

  return (
    <div className="space-y-6 animate-fade-in">
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

      <DataTable
        columns={columns}
        data={filteredData}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        pagination={{ page: 1, pageSize: 10, total: filteredData.length, onPageChange: () => {} }}
      />

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
                <Input id="usageLimit" type="number" defaultValue={editingItem?.usageLimit} placeholder="100" />
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
