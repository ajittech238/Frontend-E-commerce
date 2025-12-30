import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, Trash2, FolderTree } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockCategories = [
  { id: "1", name: "Electronics", slug: "electronics", parent: null, description: "Electronic devices and gadgets", productCount: 156, status: "active" },
  { id: "2", name: "Fashion", slug: "fashion", parent: null, description: "Clothing and accessories", productCount: 234, status: "active" },
  { id: "3", name: "Home & Living", slug: "home-living", parent: null, description: "Home decor and furniture", productCount: 89, status: "active" },
  { id: "4", name: "Smartphones", slug: "smartphones", parent: "Electronics", description: "Mobile phones", productCount: 45, status: "active" },
  { id: "5", name: "Laptops", slug: "laptops", parent: "Electronics", description: "Laptop computers", productCount: 32, status: "draft" },
];

export default function AdminCategories() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredData = mockCategories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "parent",
      header: "Parent",
      render: (item: any) => item.parent || <span className="text-muted-foreground">—</span>,
    },
    { key: "productCount", header: "Products" },
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
            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Products</DropdownMenuItem>
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
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      
      <AdminPageHeader
        title="Categories"
        description="Manage product categories and hierarchy"
        searchPlaceholder="Search categories..."
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => { setEditingItem(null); setIsDialogOpen(true); }}
        addLabel="Add Category"
        onExport={() => {}}
      />

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          selectable
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          pagination={{ page: 1, pageSize: 10, total: filteredData.length, onPageChange: () => {} }}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[90vw] max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update category details" : "Create a new category"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={editingItem?.name} placeholder="Category name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parent">Parent Category</Label>
              <Select defaultValue={editingItem?.parent || ""}>
                <SelectTrigger><SelectValue placeholder="Select parent (optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Top Level)</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home & Living">Home & Living</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={editingItem?.description} placeholder="Category description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingItem ? "Save Changes" : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}