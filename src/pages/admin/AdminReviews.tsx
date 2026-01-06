import { useState, ReactNode } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Minus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Review {
  id: string;
  productName: string;
  customer: string;
  rating: number;
  title: string;
  body: string;
  status: string;
  createdAt: string;
  helpful: number;
}

const mockReviews: Review[] = [
  { id: "1", productName: "Handmade Ceramic Vase", customer: "John Doe", rating: 5, title: "Absolutely beautiful!", body: "The craftsmanship is incredible. Exceeded my expectations.", status: "approved", createdAt: "2024-01-15", helpful: 12 },
  { id: "2", productName: "Artisan Wooden Bowl", customer: "Jane Smith", rating: 4, title: "Great quality", body: "Love the natural finish. Slightly smaller than expected.", status: "pending", createdAt: "2024-01-14", helpful: 5 },
  { id: "3", productName: "Handwoven Basket", customer: "Bob Wilson", rating: 2, title: "Disappointed", body: "Product arrived damaged. Customer service was helpful though.", status: "pending", createdAt: "2024-01-13", helpful: 3 },
  { id: "4", productName: "Macrame Wall Hanging", customer: "Alice Brown", rating: 5, title: "Perfect addition to my room", body: "The colors are exactly as shown. Beautiful work!", status: "approved", createdAt: "2024-01-12", helpful: 8 },
  { id: "5", productName: "Clay Sculpture", customer: "Charlie Davis", rating: 1, title: "Not worth the price", body: "Very poor quality. Returning immediately.", status: "rejected", createdAt: "2024-01-11", helpful: 1 },
];

export default function AdminReviews() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [expandedRows, setExpandedRows] = useState(new Set<string>());


  const filteredData = mockReviews.filter(
    (item) =>
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const paginatedData = filteredData.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const getRowId = (item: Review) => item.id;

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

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted"}`}
        />
      ))}
    </div>
  );

  const renderStatus = (item: { status: string }) => {
    const statusMap = {
      approved: {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        badge: <StatusBadge status="approved" />,
      },
      pending: {
        icon: <Clock className="w-5 h-5 text-amber-500" />,
        badge: <StatusBadge status="pending" />,
      },
      rejected: {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        badge: <StatusBadge status="rejected" />,
      },
    };
    const { icon, badge } = statusMap[item.status as keyof typeof statusMap] || statusMap.pending;

    return (
      <>
        <span className="md:hidden">{icon}</span>
        <span className="hidden md:inline-flex">{badge}</span>
      </>
    );
  };

  const renderExpandedRow = (item: Review) => {
    return (
      <div className="p-4 bg-blue-100 dark:bg-gray-700">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="font-medium">Title:</p> <p>{item.title}</p>
          <p className="font-medium">Review:</p> <p>{item.body}</p>
          <p className="font-medium">Rating:</p> <p>{renderStars(item.rating)}</p>
          <p className="font-medium">Status:</p> <p>{renderStatus(item)}</p>
          <p className="font-medium">Helpful:</p> <p className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {item.helpful}</p>
          <p className="font-medium">Date:</p> <p>{new Date(item.createdAt).toLocaleDateString()}</p>
          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-2" /> View</Button>
            <Button size="sm" variant="outline"><ThumbsUp className="w-4 h-4 mr-2" /> Approve</Button>
            <Button size="sm" variant="destructive"><ThumbsDown className="w-4 h-4 mr-2" /> Reject</Button>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      key: "product",
      header: "Product",
      className: "", // Always visible
      render: (item: Review) => (
        <div className="max-w-[150px] sm:max-w-[200px]">
          <p className="font-medium text-foreground text-xs sm:text-sm truncate">{item.productName}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      className: "hidden md:table-cell", // Visible on tablet+
      render: (item: Review) => (
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarFallback className="text-[10px] bg-pink-gradient/10 text-primary">
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
      className: "hidden md:table-cell", // Visible on tablet+
      render: (item: Review) => renderStars(item.rating),
    },
    {
      key: "review",
      header: "Review",
      className: "hidden lg:table-cell", // Visible on desktop
      render: (item: Review) => (
        <div className="max-w-[200px] sm:max-w-[300px]">
          <p className="font-medium text-foreground text-xs sm:text-sm truncate">{item.title}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.body}</p>
        </div>
      ),
    },
    {
      key: "helpful",
      header: "Help",
      className: "hidden lg:table-cell", // Visible on desktop
      render: (item: Review) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <ThumbsUp className="w-3 h-3" />
          <span className="text-sm">{item.helpful}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "table-cell md:hidden", // Visible on mobile, hidden on tablet+ (shows in expander)
      render: (item: Review) => renderStatus(item),
    },
    {
      key: "createdAt",
      header: "Date",
      className: "hidden md:table-cell", // Visible on tablet+
      render: (item: Review) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      className: "hidden lg:table-cell", // Visible on desktop
      width: "100px",
      render: (item: Review) => (
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
    {
      key: "expander",
      header: "",
      width: "50px",
    },
  ];
  return (
    <div className="space-y-6 animate-fade-in min-h-[calc(100vh-80px)] pb-10">
      <AdminPageHeader
        title="Product Reviews"
        description="Manage and moderate customer reviews"
        searchPlaceholder="Search reviews..."
        searchValue={search}
        onSearchChange={setSearch}
        onExport={() => { }}
        onRefresh={() => { }}
      />

      <div className="space-y-4">
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[1500px] w-full whitespace-nowrap table-auto">
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
                    const isExpandCol = col.key === "expander"; // Assuming expander column for mobile
                    return (
                      <TableHead
                        key={col.key}
                        className={`${col.className || ""} ${isExpandCol ? "lg:hidden" : "" // Hide expander on large screens
                          } font-semibold text-foreground text-xs sm:text-sm`}
                        style={{ width: col.width }}
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
                      No reviews found
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
                                className={`${col.className || ""} ${isExpandCol ? "lg:hidden" : ""} text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words`}
                                style={{ width: col.width }}
                                onClick={(e) => {
                                  if (isExpandCol) e.stopPropagation();
                                }}
                              >
                                {cellContent}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        {isExpanded && renderExpandedRow && (
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
