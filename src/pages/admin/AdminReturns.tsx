import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Eye, RotateCcw, Package, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatCard } from "@/components/admin/StatCard";

const mockReturns = [
  { id: "RTN001", orderId: "ORD-2024-001", productName: "Handmade Ceramic Vase", reason: "Damaged during shipping", status: "pending", refundAmount: 1299, customer: "John Doe", createdAt: "2024-01-15" },
  { id: "RTN002", orderId: "ORD-2024-002", productName: "Artisan Wooden Bowl", reason: "Wrong item received", status: "approved", refundAmount: 899, customer: "Jane Smith", createdAt: "2024-01-14" },
  { id: "RTN003", orderId: "ORD-2024-003", productName: "Handwoven Basket", reason: "Not as described", status: "processing", refundAmount: 549, customer: "Bob Wilson", createdAt: "2024-01-13" },
  { id: "RTN004", orderId: "ORD-2024-004", productName: "Macrame Wall Hanging", reason: "Changed mind", status: "refunded", refundAmount: 1499, customer: "Alice Brown", createdAt: "2024-01-12" },
  { id: "RTN005", orderId: "ORD-2024-005", productName: "Clay Sculpture", reason: "Quality issues", status: "rejected", refundAmount: 2199, customer: "Charlie Davis", createdAt: "2024-01-11" },
];

const stats = [
  { title: "Pending Returns", value: "12", change: "+3", trend: "up" as const, icon: AlertTriangle, gradient: "from-amber-500 to-orange-500", bgGradient: "from-amber-500/10 to-orange-500/10" },
  { title: "Processed Today", value: "8", change: "+5", trend: "up" as const, icon: CheckCircle, gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-500/10 to-teal-500/10" },
  { title: "Total Refunded", value: "₹45,678", change: "-2.4%", trend: "down" as const, icon: DollarSign, gradient: "from-blue-500 to-indigo-500", bgGradient: "from-blue-500/10 to-indigo-500/10" },
  { title: "Return Rate", value: "2.3%", change: "-0.5%", trend: "down" as const, icon: Package, gradient: "from-purple-500 to-pink-500", bgGradient: "from-purple-500/10 to-pink-500/10" },
];

export default function AdminReturns() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = mockReturns.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "id",
      header: "Return ID",
      render: (item: any) => <code className="text-xs bg-muted px-2 py-1 rounded">{item.id}</code>,
    },
    {
      key: "product",
      header: "Product",
      render: (item: any) => (
        <div>
          <p className="font-medium text-foreground text-xs sm:text-sm">{item.productName}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{item.orderId}</p>
        </div>
      ),
    },
    { key: "customer", header: "Customer", className: "hidden md:table-cell" },
    { key: "reason", header: "Reason", className: "hidden lg:table-cell" },
    {
      key: "refundAmount",
      header: "Refund",
      className: "hidden sm:table-cell",
      render: (item: any) => <span className="font-medium">₹{item.refundAmount.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      className: "hidden xs:table-cell",
      render: (item: any) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Date",
      className: "hidden xl:table-cell",
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
            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Details</DropdownMenuItem>
            <DropdownMenuItem><RotateCcw className="w-4 h-4 mr-2" /> Process Refund</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in min-h-[calc(100vh-80px)] pb-10">
      <AdminPageHeader
        title="Returns & Refunds"
        description="Manage product returns and refund requests"
        searchPlaceholder="Search returns..."
        searchValue={search}
        onSearchChange={setSearch}
        onExport={() => {}}
        onRefresh={() => {}}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

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
