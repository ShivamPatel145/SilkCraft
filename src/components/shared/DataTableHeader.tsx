import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface DataTableHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showViewToggle?: boolean;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  sortOptions?: FilterOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  filterCategories?: {
    label: string;
    options: FilterOption[];
  }[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (category: string, values: string[]) => void;
  showExport?: boolean;
  onExport?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  rightActions?: React.ReactNode;
  totalCount?: number;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline" | "accent" | "premium";
  };
}

const DataTableHeader = ({
  title,
  subtitle,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  showViewToggle = false,
  viewMode = "grid",
  onViewModeChange,
  sortOptions = [],
  sortValue = "",
  onSortChange,
  filterCategories = [],
  selectedFilters = {},
  onFilterChange,
  showExport = false,
  onExport,
  showRefresh = false,
  onRefresh,
  rightActions,
  totalCount,
  badge
}: DataTableHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              {badge && (
                <Badge variant={badge.variant || "default"}>
                  {badge.text}
                </Badge>
              )}
              {totalCount !== undefined && (
                <Badge variant="outline">
                  {totalCount.toLocaleString()} items
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {showRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            
            {showExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
            
            {rightActions}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {/* Filters */}
            {filterCategories.length > 0 && (
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Filters</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          filterCategories.forEach(category => {
                            onFilterChange?.(category.label, []);
                          });
                        }}
                      >
                        Clear All
                      </Button>
                    </div>
                    
                    {filterCategories.map((category) => (
                      <div key={category.label} className="space-y-2">
                        <Label className="text-sm font-medium">
                          {category.label}
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {category.options.map((option) => (
                            <Button
                              key={option.value}
                              variant={
                                selectedFilters[category.label]?.includes(option.value)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="justify-start h-auto p-2"
                              onClick={() => {
                                const current = selectedFilters[category.label] || [];
                                const newFilters = current.includes(option.value)
                                  ? current.filter(v => v !== option.value)
                                  : [...current, option.value];
                                onFilterChange?.(category.label, newFilters);
                              }}
                            >
                              <span className="truncate">{option.label}</span>
                              {option.count && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  {option.count}
                                </Badge>
                              )}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
            
            {/* Sort */}
            {sortOptions.length > 0 && (
              <Select value={sortValue} onValueChange={onSortChange}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    {sortValue?.includes("desc") ? (
                      <SortDesc className="w-4 h-4" />
                    ) : (
                      <SortAsc className="w-4 h-4" />
                    )}
                    <SelectValue placeholder="Sort by..." />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {/* View Toggle */}
            {showViewToggle && (
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange?.("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewModeChange?.("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTableHeader;