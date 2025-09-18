import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  X,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { products, categories, colors, priceRanges, type Product } from "@/data/products";
import { useCartWithNavigation } from "@/hooks/useCartWithNavigation";

const Catalog = () => {
  const { addItem } = useCartWithNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Simulate loading on component mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

    // Filter and sort products
  const allFilteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      // Color filter
      const matchesColor = selectedColors.length === 0 || 
        selectedColors.some(colorId => 
          product.color.toLowerCase().includes(colorId.toLowerCase())
        );

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesColor && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedColors, priceRange, sortBy]);

  // Paginated products
  const filteredProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allFilteredProducts.slice(startIndex, endIndex);
  }, [allFilteredProducts, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(allFilteredProducts.length / itemsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedColors, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleColorChange = (colorId: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, colorId]);
    } else {
      setSelectedColors(selectedColors.filter(id => id !== colorId));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange([0, 50000]);
    setSearchQuery("");
  };

  const handleAddToCart = async (product: Product, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      await addItem(product);
    }
  };

  const activeFiltersCount = selectedCategories.length + selectedColors.length + 
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-subtle py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="w-fit mx-auto">
              {allFilteredProducts.length} Products
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              Saree Collection
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our exquisite collection of handcrafted sarees from master artisans across India
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search sarees by name, fabric, color..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filter Button */}
            <div className="sm:hidden">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative h-12 w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-primary">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 sm:w-96">
                  <FilterSidebar 
                    categories={categories}
                    colors={colors}
                    selectedCategories={selectedCategories}
                    selectedColors={selectedColors}
                    priceRange={priceRange}
                    onCategoryChange={handleCategoryChange}
                    onColorChange={handleColorChange}
                    onPriceChange={setPriceRange}
                    onClearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-border rounded-lg shrink-0">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none h-10 px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none h-10 px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Active filters:</span>
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                return (
                  <Badge key={categoryId} variant="secondary" className="gap-1">
                    {category?.name}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleCategoryChange(categoryId, false)}
                    />
                  </Badge>
                );
              })}
              {selectedColors.map(colorId => {
                const color = colors.find(c => c.id === colorId);
                return (
                  <Badge key={colorId} variant="secondary" className="gap-1">
                    {color?.name}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleColorChange(colorId, false)}
                    />
                  </Badge>
                );
              })}
              {(priceRange[0] > 0 || priceRange[1] < 50000) && (
                <Badge variant="secondary" className="gap-1">
                  ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setPriceRange([0, 50000])}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden sm:block w-64 lg:w-80 flex-shrink-0">
            <FilterSidebar 
              categories={categories}
              colors={colors}
              selectedCategories={selectedCategories}
              selectedColors={selectedColors}
              priceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onColorChange={handleColorChange}
              onPriceChange={setPriceRange}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>

          {/* Product Grid/List */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8" 
                  : "space-y-4"
              }>
                {Array.from({ length: 12 }).map((_, index) => (
                  <ProductSkeleton key={index} viewMode={viewMode} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters} className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8" 
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {!isLoading && allFilteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      if (pageNumber <= totalPages) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              onClick={() => setCurrentPage(pageNumber)}
                              isActive={currentPage === pageNumber}
                              className="cursor-pointer"
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Filter Sidebar Component
interface FilterSidebarProps {
  categories: Array<{id: string, name: string, count: number}>;
  colors: Array<{id: string, name: string, hex: string}>;
  selectedCategories: string[];
  selectedColors: string[];
  priceRange: [number, number];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
  onColorChange: (colorId: string, checked: boolean) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

function FilterSidebar({
  categories,
  colors,
  selectedCategories,
  selectedColors,
  priceRange,
  onCategoryChange,
  onColorChange,
  onPriceChange,
  onClearFilters,
  activeFiltersCount
}: FilterSidebarProps) {
  return (
    <div className="space-y-6 p-4 sm:p-0">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Clear all ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">Categories</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">{categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => 
                  onCategoryChange(category.id, checked as boolean)
                }
              />
              <label 
                htmlFor={category.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 flex justify-between"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">Price Range</h4>
        <div className="space-y-4 px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={50000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="bg-muted px-2 py-1 rounded">₹{priceRange[0].toLocaleString()}</span>
            <span className="bg-muted px-2 py-1 rounded">₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">Colors</h4>
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-3 px-2">
          {colors.map((color) => (
            <div key={color.id} className="flex flex-col items-center gap-2">
              <button
                onClick={() => onColorChange(color.id, !selectedColors.includes(color.id))}
                className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-105 ${
                  selectedColors.includes(color.id) 
                    ? 'border-primary ring-2 ring-primary/20 scale-110' 
                    : 'border-border hover:border-muted-foreground'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="text-xs text-center text-muted-foreground truncate w-full">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  onAddToCart: (product: Product, quantity: number) => Promise<void>;
}

function ProductCard({ product, viewMode, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  if (viewMode === "list") {
    return (
      <Card 
        className="group bg-white rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-200/60 overflow-hidden cursor-pointer"
        onClick={() => {
          // Open product detail modal
          const detailButton = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLButtonElement;
          if (detailButton) {
            detailButton.click();
          }
        }}
      >
        <div className="flex p-5 gap-5">
          <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded-md bg-gray-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            
            {/* Simple badge */}
            {(product.isNew || discountPercentage > 0 || !product.inStock) && (
              <div className="absolute top-2 left-2">
                {!product.inStock ? (
                  <Badge className="bg-gray-900 text-white text-xs px-2 py-1">
                    Sold Out
                  </Badge>
                ) : product.isNew ? (
                  <Badge className="bg-green-600 text-white text-xs px-2 py-1">
                    New
                  </Badge>
                ) : discountPercentage > 0 ? (
                  <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                    {discountPercentage}% OFF
                  </Badge>
                ) : null}
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div className="space-y-2">
              <div>
                <h3 className="font-medium text-gray-900 text-base mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{product.fabric}</span>
                <span>•</span>
                <span>{product.color}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-gray-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <span className="text-xs text-green-600 font-medium">
                    Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                  }}
                  className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} />
                </button>
                <Button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await onAddToCart(product, 1);
                  }}
                  disabled={!product.inStock}
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {product.inStock ? 'Add to Cart' : 'Sold Out'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden ProductDetail trigger for programmatic access */}
        <ProductDetail
          product={product}
          onAddToCart={onAddToCart}
          trigger={
            <button 
              data-product-id={product.id}
              className="hidden"
            />
          }
        />
      </Card>
    );
  }

  // Grid view
  return (
    <Card 
      className="group relative bg-white rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-200/60 overflow-hidden cursor-pointer"
      onClick={() => {
        // Open product detail modal
        const detailButton = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLButtonElement;
        if (detailButton) {
          detailButton.click();
        }
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        
        {/* Simple badges - only show essential ones */}
        {(product.isNew || discountPercentage > 0 || !product.inStock) && (
          <div className="absolute top-3 left-3">
            {!product.inStock ? (
              <Badge className="bg-gray-900 text-white text-xs px-2 py-1 font-medium">
                Sold Out
              </Badge>
            ) : product.isNew ? (
              <Badge className="bg-green-600 text-white text-xs px-2 py-1 font-medium">
                New
              </Badge>
            ) : discountPercentage > 0 ? (
              <Badge className="bg-red-600 text-white text-xs px-2 py-1 font-medium">
                {discountPercentage}% OFF
              </Badge>
            ) : null}
          </div>
        )}
        
        {/* Simple wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} />
        </button>
      </div>
      
      <CardContent className="p-4 space-y-3">
        {/* Essential product info */}
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{product.fabric}</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-500">{product.color}</span>
          </div>
        </div>
        
        {/* Simple rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-amber-400 text-amber-400' 
                    : 'text-gray-200'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        
        {/* Clean price display */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-xs text-green-600 font-medium">
                Save ₹{(product.originalPrice! - product.price).toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Simple stock indicator */}
          <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} title={product.inStock ? 'In Stock' : 'Out of Stock'}></div>
        </div>
        
        {/* Static Add to Cart Button */}
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            await onAddToCart(product, 1);
          }}
          disabled={!product.inStock}
          size="sm"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium mt-3"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Sold Out'}
        </Button>
        
        {/* Hidden ProductDetail trigger for programmatic access */}
        <ProductDetail
          product={product}
          onAddToCart={onAddToCart}
          trigger={
            <button 
              data-product-id={product.id}
              className="hidden"
            />
          }
        />
      </CardContent>
    </Card>
  );
}

// Product Skeleton Component
interface ProductSkeletonProps {
  viewMode: "grid" | "list";
}

function ProductSkeleton({ viewMode }: ProductSkeletonProps) {
  if (viewMode === "list") {
    return (
      <Card className="bg-white rounded-lg border border-gray-200/60">
        <div className="flex p-5 gap-5">
          <Skeleton className="w-32 h-40 rounded-md" />
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-3 h-3 rounded" />
                ))}
                <Skeleton className="h-3 w-8 ml-1" />
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div>
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-8 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg border border-gray-200/60">
      <div className="relative aspect-[3/4]">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-3 h-3 rounded" />
          ))}
          <Skeleton className="h-3 w-8 ml-1" />
        </div>
        <div className="flex justify-between items-center pt-1">
          <div>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-3 w-12 mt-1" />
          </div>
          <Skeleton className="w-2 h-2 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default Catalog;