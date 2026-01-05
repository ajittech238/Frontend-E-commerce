import { useState, ReactNode } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Eye, RotateCcw, Package, DollarSign, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatCard } from "@/components/admin/StatCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Return {
  id: string;
  orderId: string;
  productName: string;
  reason: string;
  status: string;
  refundAmount: number;
  customer: string;
  createdAt: string;
}

const mockReturns: Return[] = [
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
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  
  const filteredData = mockReturns.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const getRowId = (item: Return) => item.id;

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


  const columns = [
    {
      key: "id",
      header: "Return ID",
      render: (item: Return) => <code className="text-xs bg-muted px-2 py-1 rounded">{item.id}</code>,
    },
    {
      key: "product",
      header: "Product",
      render: (item: Return) => (
        <div>
          <p className="font-medium text-foreground text-xs sm:text-sm">{item.productName}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{item.orderId}</p>
        </div>
      ),
    },
    { key: "customer", header: "Customer", className: "hidden md:table-cell", render: (item: Return) => item.customer },
    { key: "reason", header: "Reason", className: "hidden lg:table-cell", render: (item: Return) => item.reason },
    {
      key: "refundAmount",
      header: "Refund",
      className: "hidden sm:table-cell",
      render: (item: Return) => <span className="font-medium">₹{item.refundAmount.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      className: "hidden xs:table-cell",
      render: (item: Return) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Date",
      className: "hidden xl:table-cell",
      render: (item: Return) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: Return) => (
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
                    <TableHead key={col.key} style={{ width: col.width }} className={`${col.className || ''} font-semibold text-foreground text-xs sm:text-sm`}>
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + 1}
                      className="h-24 sm:h-32 text-center text-xs sm:text-sm text-muted-foreground"
                    >
                      No returns found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => {
                    const id = getRowId(item);
                    const isSelected = selectedIds.includes(id);
                    return (
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
                            className={`${col.className || ''} text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words`}
                          >
                            {col.render ? col.render(item) : item[col.key as keyof typeof item] as ReactNode}
                          </TableCell>
                        ))}
                      </TableRow>
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
    </div>
  );
}
