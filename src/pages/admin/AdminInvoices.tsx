import { useState, ReactNode } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Download, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, FileCheck, Clock, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Invoice {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  tax: number;
  status: string;
  createdAt: string;
  pdfPath: string | null;
}

const mockInvoices: Invoice[] = [
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
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [expandedRows, setExpandedRows] = useState(new Set<string>());

  const filteredData = mockInvoices.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
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

  const getRowId = (item: Invoice) => item.id;

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

  const renderExpandedRow = (item: Invoice) => (
    <div className="bg-muted/50 dark:bg-muted/80 p-3 mx-2 my-1 rounded-lg border border-border/50 animate-in slide-in-from-top-2">
      <div className="space-y-3">

        {/* TOP INFO */}
        <div className="bg-card p-3 rounded-md border border-border/30">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Invoice</p>
          <p className="text-sm font-semibold text-foreground">{item.id}</p>
          <p className="text-xs text-muted-foreground">{item.orderId}</p>
        </div>

        {/* GRID INFO (Coupons style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-card p-3 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Customer</p>
            <p className="text-sm font-semibold">{item.customer}</p>
          </div>

          <div className="bg-card p-3 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Amount</p>
            <p className="text-sm font-semibold">₹{item.amount.toLocaleString()}</p>
          </div>

          <div className="bg-card p-3 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Tax</p>
            <p className="text-sm font-semibold">₹{item.tax.toLocaleString()}</p>
          </div>
        </div>

        {/* TOTAL + STATUS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card p-3 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground mb-1 font-medium">Total</p>
            <p className="text-sm font-semibold text-primary">
              ₹{(item.amount + item.tax).toLocaleString()}
            </p>
          </div>

          <div className="bg-card p-3 rounded-md border border-border/30 flex items-center justify-center">
            <StatusBadge status={item.status} />
          </div>
        </div>

        {/* ACTIONS (VERY IMPORTANT) */}
        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>

          <Button size="sm" variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>

      </div>
    </div>
  );


  const columns = [
    {
      key: "id",
      header: "Invoice #",
      render: (item: Invoice) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground hidden sm:block" />
          <span className="font-mono font-medium text-xs sm:text-sm">{item.id}</span>
        </div>
      ),
    },
    { key: "orderId", header: "Order ID", className: "hidden md:table-cell", render: (item: Invoice) => item.orderId },
    { key: "customer", header: "Customer", className: "hidden md:table-cell", render: (item: Invoice) => item.customer },
    {
      key: "amount",
      header: "Amount",
      className: "hidden lg:table-cell",
      render: (item: Invoice) => <span className="font-medium">₹{item.amount.toLocaleString()}</span>,
    },
    {
      key: "tax",
      header: "Tax",
      className: "hidden lg:table-cell",
      render: (item: Invoice) => <span className="text-muted-foreground">₹{item.tax}</span>,
    },
    {
      key: "total",
      header: "Total",
      className: "hidden lg:table-cell",
      render: (item: Invoice) => <span className="font-semibold text-primary">₹{(item.amount + item.tax).toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      className: "hidden lg:table-cell",
      render: (item: Invoice) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Date",
      className: "hidden lg:table-cell",
      render: (item: Invoice) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      className: "hidden lg:table-cell",
      width: "60px",
      render: (item: Invoice) => (
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
    {
      key: "expander",
      header: "",
      width: "50px",
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
        onAdd={() => { }}
        addLabel="Generate Invoice"
        onExport={() => { }}
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
                  {columns.map((col) => {
                    const isExpandCol = col.key === 'expander';
                    return (
                      <TableHead
                        key={col.key}
                        style={{ width: col.width }}
                        className={`${col.className || ''} ${isExpandCol ? 'lg:hidden' : ''
                          } font-semibold text-foreground text-xs sm:text-sm`}
                      >
                        {isExpandCol ? <ChevronDown className="w-4 h-4" /> : col.header}
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
                      No invoices found
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
                                  <ChevronDown
                                    className={`h-4 w-4 text-primary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                  />
                                </Button>
                              );
                            } else {
                              cellContent = col.render ? col.render(item) : (item as unknown as Record<string, unknown>)[col.key] as ReactNode;
                            }
                            return (
                              <TableCell
                                key={col.key}
                                style={{ width: col.width }}
                                className={`${col.className || ''} text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words`}
                              >
                                {cellContent}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        {isExpanded && (
                          <TableRow className="lg:hidden border-l-4 border-primary bg-muted/20 hover:bg-muted/30 rounded-lg">
                            <TableCell colSpan={columns.length + 1} className="p-0">
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
    </div>
  );
}