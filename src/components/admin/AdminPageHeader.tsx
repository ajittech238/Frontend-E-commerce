import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Upload, Filter, RefreshCw } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onAdd?: () => void;
  addLabel?: string;
  onExport?: () => void;
  onImport?: () => void;
  onFilter?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  children?: ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  onAdd,
  addLabel = "Add New",
  onExport,
  onImport,
  onFilter,
  onRefresh,
  isRefreshing,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="space-y-3 md:space-y-4 mb-6 ">
      <div className="flex flex-col gap-3  md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground truncate">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="hidden xs:inline-flex"
            >
              <RefreshCw className={`w-4 h-4 sm:mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          )}
          {onFilter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onFilter}
              className="hidden xs:inline-flex"
            >
              <Filter className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          )}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="hidden sm:inline-flex"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
          {onImport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onImport}
              className="hidden sm:inline-flex"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          )}
          {onAdd && (
            <Button size="sm" onClick={onAdd} className="bg-pink-gradient">
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">{addLabel}</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-3">
        {onSearchChange && (
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
