import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockReviews = [
  { id: "1", productName: "Handmade Ceramic Vase", customer: "John Doe", rating: 5, title: "Absolutely beautiful!", body: "The craftsmanship is incredible. Exceeded my expectations.", status: "approved", createdAt: "2024-01-15", helpful: 12 },
  { id: "2", productName: "Artisan Wooden Bowl", customer: "Jane Smith", rating: 4, title: "Great quality", body: "Love the natural finish. Slightly smaller than expected.", status: "pending", createdAt: "2024-01-14", helpful: 5 },
  { id: "3", productName: "Handwoven Basket", customer: "Bob Wilson", rating: 2, title: "Disappointed", body: "Product arrived damaged. Customer service was helpful though.", status: "pending", createdAt: "2024-01-13", helpful: 3 },
  { id: "4", productName: "Macrame Wall Hanging", customer: "Alice Brown", rating: 5, title: "Perfect addition to my room", body: "The colors are exactly as shown. Beautiful work!", status: "approved", createdAt: "2024-01-12", helpful: 8 },
  { id: "5", productName: "Clay Sculpture", customer: "Charlie Davis", rating: 1, title: "Not worth the price", body: "Very poor quality. Returning immediately.", status: "rejected", createdAt: "2024-01-11", helpful: 1 },
];

export default function AdminReviews() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = mockReviews.filter(
    (item) =>
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`}
        />
      ))}
    </div>
  );

  const columns = [
    {
      key: "product",
      header: "Product",
      render: (item: any) => (
        <div className="max-w-[200px]">
          <p className="font-medium text-foreground truncate">{item.productName}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {item.customer.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{item.customer}</span>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (item: any) => renderStars(item.rating),
    },
    {
      key: "review",
      header: "Review",
      render: (item: any) => (
        <div className="max-w-[300px]">
          <p className="font-medium text-foreground text-sm">{item.title}</p>
          <p className="text-xs text-muted-foreground truncate">{item.body}</p>
        </div>
      ),
    },
    {
      key: "helpful",
      header: "Helpful",
      render: (item: any) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <ThumbsUp className="w-3 h-3" />
          <span className="text-sm">{item.helpful}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item: any) => new Date(item.createdAt).toLocaleDateString(),
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
            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
            <DropdownMenuItem><ThumbsUp className="w-4 h-4 mr-2" /> Approve</DropdownMenuItem>
            <DropdownMenuItem><ThumbsDown className="w-4 h-4 mr-2" /> Reject</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><MessageSquare className="w-4 h-4 mr-2" /> Reply</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <AdminPageHeader
        title="Product Reviews"
        description="Manage and moderate customer reviews"
        searchPlaceholder="Search reviews..."
        searchValue={search}
        onSearchChange={setSearch}
        onExport={() => {}}
        onRefresh={() => {}}
      />

      <DataTable
        columns={columns}
        data={filteredData}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        pagination={{ page: 1, pageSize: 10, total: filteredData.length, onPageChange: () => {} }}
      />
    </div>
  );
}
