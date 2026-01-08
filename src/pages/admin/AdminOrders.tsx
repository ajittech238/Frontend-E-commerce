import { useOrder } from "@/context/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminOrders = () => {
  const { getAllOrders, updateOrderStatus } = useOrder();
  const orders = getAllOrders();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [expandedRows, setExpandedRows] = useState(new Set<string>());
  
  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
    
  const totalPages = Math.ceil(orders.length / pagination.pageSize);
  
  const paginatedData = orders.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );
  
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };
  
  const getRowId = (item: any) => item.id;
  
  const allSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedOrders.includes(getRowId(item)));
  const someSelected = paginatedData.some((item) => selectedOrders.includes(getRowId(item)));
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(paginatedData.map(getRowId));
    } else {
      setSelectedOrders([]);
    }
  };
  
  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, id]);
    } else {
      setSelectedOrders(selectedOrders.filter((i) => i !== id));
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
  
  const renderExpandedRow = (item: any) => {
    return (
      <div className="bg-muted/50 dark:bg-muted/80 p-4 mx-2 my-1 rounded-lg border border-border/50 animate-in slide-in-from-top-2">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:hidden">
              <p className="text-xs text-muted-foreground mb-1 font-medium">Customer</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">{item.customerName?.charAt(0) || 'C'}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{item.customerName}</p>
              </div>
            </div>
            <div className="bg-card p-3 rounded-md border border-border/30 flex items-center justify-center gap-2">
              <p className="text-xs text-muted-foreground font-medium">Amount</p>
              <span className="text-lg font-bold text-blue-600">₹{item.total?.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-card p-3 rounded-md border border-border/30 max-w-full">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Order Details</p>
            <p className="font-medium text-foreground mb-1">ID: {item.id}</p>
            <p className="text-sm text-foreground max-w-full overflow-hidden break-words whitespace-normal">Status: <Badge className={statusColors[item.orderStatus || "pending"]}>{item.orderStatus?.toUpperCase()}</Badge></p>
            <p className="text-sm text-foreground max-w-full overflow-hidden break-words whitespace-normal">Payment: <Badge className={item.paymentStatus === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{item.paymentStatus?.toUpperCase()}</Badge></p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-card p-3 rounded-md border border-border/30 flex flex-col items-center justify-center gap-2">
              <p className="text-xs text-muted-foreground font-medium">Order Status</p>
              <Badge className={statusColors[item.orderStatus || "pending"]}>{item.orderStatus?.toUpperCase()}</Badge>
            </div>
            <div className="bg-card p-3 rounded-md border border-border/30 flex items-center justify-center">
              <Badge className={item.paymentStatus === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{item.paymentStatus?.toUpperCase()}</Badge>
            </div>
            <div className="bg-card p-3 rounded-md border border-border/30">
              <p className="text-xs text-muted-foreground mb-1 font-medium">Date</p>
              <p className="text-sm font-semibold text-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
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
                    // Add view logic here (e.g., open modal)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add edit logic here (e.g., open edit modal)
                  }}
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Edit
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
  };

  const columns: any[] = [
    {
      key: "id",
      header: "Order ID",
      width: "120px",
      showOnMobile: true,
      render: (order: any) => (
        <span className="font-mono text-xs font-bold">{order.id}</span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      width: "150px",
      showOnMobile: false,
      render: (order: any) => order.customerName,
    },
    {
      key: "total",
      header: "Amount",
      width: "100px",
      showOnMobile: true,
      render: (order: any) => (
        <span className="font-bold text-blue-600">₹{order.total.toLocaleString()}</span>
      ),
    },
    {
      key: "orderStatus",
      header: "Status",
      width: "120px",
      showOnMobile: false,
      render: (order: any) => (
        <Badge className={statusColors[order.orderStatus]}>
          {order.orderStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      width: "100px",
      showOnMobile: false,
      render: (order: any) => (
        <Badge className={order.paymentStatus === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
          {order.paymentStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      width: "120px",
      showOnMobile: false,
      render: (order: any) => (
        <span className="text-sm">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      showOnMobile: false,
      render: (order: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                // Add view logic here (e.g., open modal)
              }}
            >
              <Eye className="h-4 w-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                // Add edit logic here (e.g., open edit modal)
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      key: "expander",
      header: "",
      width: "50px",
      showOnMobile: true,
      render: (item: any) => (
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand(item.id);
          }}
        >
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${expandedRows.has(item.id) ? 'rotate-180' : ''}`} 
          />
        </Button>
      ),
    },
  ];

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.orderStatus === "pending").length,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      label: "Processing",
      value: orders.filter((o) => o.orderStatus === "processing").length,
      color: "bg-purple-100 text-purple-800",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.orderStatus === "delivered").length,
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Total Revenue",
      value: `₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`,
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="space-y-6 min-h-[calc(100vh-80px)] pb-10">
      <div className="px-1 xs:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Orders Management</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage all customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 px-1 xs:px-0">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Card className="border-border/50 mx-1 xs:mx-0">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
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
                          className={`font-semibold text-foreground text-xs sm:text-sm ${col.showOnMobile === false ? 'hidden md:table-cell' : ''}`}
                        >
                          {col.header}
                        </TableHead>
                      ))}
                      <TableHead className="w-12 lg:hidden">
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
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedData.map((item) => {
                        const id = getRowId(item);
                        const isSelected = selectedOrders.includes(id);
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
                                  className={`text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words ${col.showOnMobile === false ? 'hidden md:table-cell' : ''}`}
                                >
                                  {col.render ? col.render(item) : item[col.key as keyof typeof item] as ReactNode}
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
                {Math.min(pagination.page * pagination.pageSize, orders.length)} of{" "}
                {orders.length}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
