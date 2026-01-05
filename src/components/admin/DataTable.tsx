
import React, { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  getRowId?: (item: T) => string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  showMobileExpand?: boolean;
  expandColumnKey?: string;
  renderExpandedRow?: (item: T) => ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  loading,
  selectable,
  selectedIds = [],
  onSelectionChange,
  getRowId = (item: T) => String((item as Record<string, unknown>).id),
  pagination,
  emptyMessage = "No data found",
  onRowClick,
  showMobileExpand = false,
  expandColumnKey = "actions",
  renderExpandedRow,
}: DataTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState(new Set<string>());
  const allSelected = data.length > 0 && data.every((item) => selectedIds.includes(getRowId(item)));
  const someSelected = data.some((item) => selectedIds.includes(getRowId(item)));

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange(data.map(getRowId));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      onSelectionChange([...selectedIds, id]);
    } else {
      onSelectionChange(selectedIds.filter((i) => i !== id));
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

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;
  const selectableClassName = selectable ? "w-12" : "";
  const emptyColSpan = columns.length + (selectable ? 1 : 0);

  if (loading) {
    return (
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              {selectable && <TableHead className={selectableClassName} />}
              {columns.map((col) => (
                <TableHead key={col.key} style={{ width: col.width }} className={col.className}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {selectable && (
                  <TableCell className={selectableClassName}>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key} style={{ width: col.width }} className={col.className}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full table-auto">
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                {selectable && (
                  <TableHead className={selectableClassName}>
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                      className={someSelected && !allSelected ? "data-[state=checked]:bg-pink-gradient/50" : ""}
                    />
                  </TableHead>
                )}
                {columns.map((col) => {
                  const isExpandCol = showMobileExpand && col.key === expandColumnKey;
                  return (
                    <TableHead
                      key={col.key}
                      style={{ width: col.width }}
                      className={`${col.className || ""} ${
                        isExpandCol ? "lg:hidden" : ""
                      } font-semibold text-foreground text-xs sm:text-sm`}
                    >
                      {isExpandCol ? "" : col.header}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={emptyColSpan}
                    className="h-24 sm:h-32 text-center text-xs sm:text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => {
                  const id = getRowId(item);
                  const isSelected = selectedIds.includes(id);
                  const isExpanded = expandedRows.has(id);
                  return (
                    <>
                      <TableRow
                        key={id}
                        className={`transition-colors ${
                          isSelected ? "bg-pink-gradient/5" : ""
                        } ${onRowClick ? "cursor-pointer" : ""}`}
                        onClick={() => onRowClick?.(item)}
                      >
                        {selectable && (
                          <TableCell
                            className={selectableClassName}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleSelectRow(id, !!checked)}
                              aria-label={`Select row ${id}`}
                            />
                          </TableCell>
                        )}
                        {columns.map((col) => {
                          const isExpandCol = showMobileExpand && col.key === expandColumnKey;
                          let cellContent = col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as ReactNode;

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
                          }

                          return (
                            <TableCell
                              key={col.key}
                              style={{ width: col.width }}
                              className={`${col.className || ""} ${isExpandCol ? "lg:hidden" : ""} text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 break-words`}
                              onClick={(e) => {
                                if (isExpandCol) e.stopPropagation();
                              }}
                            >
                              {cellContent}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {showMobileExpand && isExpanded && renderExpandedRow && (
                        <TableRow className="lg:hidden border-l-4 border-primary bg-muted/20 hover:bg-muted/30 rounded-lg">
                          <TableCell colSpan={emptyColSpan} className="p-0">
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

      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs sm:text-sm">
          <p className="text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page === 1}
              title="First page"
            >
              <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
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
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              title="Next page"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 sm:w-9 sm:h-9"
              onClick={() => pagination.onPageChange(totalPages)}
              disabled={pagination.page === totalPages}
              title="Last page"
            >
              <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
