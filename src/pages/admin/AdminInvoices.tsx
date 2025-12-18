import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Download, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, FileCheck, Clock, AlertCircle } from "lucide-react";

const mockInvoices = [
  { id: "INV-2024-001", orderId: "ORD-2024-001", customer: "John Doe", amount: 2499, tax: 450, status: "paid", createdAt: "2024-01-15", pdfPath: "/invoices/inv-001.pdf" },
  { id: "INV-2024-002", orderId: "ORD-2024-002", customer: "Jane Smith", amount: 1899, tax: 342, status: "paid", createdAt: "2024-01-14", pdfPath: "/invoices/inv-002.pdf" },
  { id: "INV-2024-003", orderId: "ORD-2024-003", customer: "Bob Wilson", amount: 3299, tax: 594, status: "unpaid", createdAt: "2024-01-13", pdfPath: null },
  { id: "INV-2024-004", orderId: "ORD-2024-004", customer: "Alice Brown", amount: 999, tax: 180, status: "overdue", createdAt: "2024-01-05", pdfPath: null },
  { id: "INV-2024-005", orderId: "ORD-2024-005", customer: "Charlie Davis", amount: 4599, tax: 828, status: "paid", createdAt: "2024-01-12", pdfPath: "/invoices/inv-005.pdf" },
];

const stats = [
  { title: "Total Invoiced", value: "₹2,45,678", change: "+15.2%", trend: "up" as const, icon: DollarSign, gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-500/10 to-teal-500/10" },
  { title: "Paid Invoices", value: "156", change: "+12", trend: "up" as const, icon: FileCheck, gradient: "from-blue-500 to-indigo-500", bgGradient: "from-blue-500/10 to-indigo-500/10" },
  { title: "Pending", value: "23", change: "-5", trend: "down" as const, icon: Clock, gradient: "from-amber-500 to-orange-500", bgGradient: "from-amber-500/10 to-orange-500/10" },
  { title: "Overdue", value: "8", change: "+2", trend: "up" as const, icon: AlertCircle, gradient: "from-red-500 to-pink-500", bgGradient: "from-red-500/10 to-pink-500/10" },
];

export default function AdminInvoices() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = mockInvoices.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "id",
      header: "Invoice #",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono font-medium">{item.id}</span>
        </div>
      ),
    },
    { key: "orderId", header: "Order ID" },
    { key: "customer", header: "Customer" },
    {
      key: "amount",
      header: "Amount",
      render: (item: any) => <span className="font-medium">₹{item.amount.toLocaleString()}</span>,
    },
    {
      key: "tax",
      header: "Tax",
      render: (item: any) => <span className="text-muted-foreground">₹{item.tax}</span>,
    },
    {
      key: "total",
      header: "Total",
      render: (item: any) => <span className="font-semibold text-primary">₹{(item.amount + item.tax).toLocaleString()}</span>,
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
            <DropdownMenuItem><Download className="w-4 h-4 mr-2" /> Download PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <AdminPageHeader
        title="Invoices"
        description="Manage and download invoices"
        searchPlaceholder="Search invoices..."
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => {}}
        addLabel="Generate Invoice"
        onExport={() => {}}
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
