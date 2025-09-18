import { useState, useMemo } from "react";
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

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      // Color filter
      const matchesColor = selectedColors.length === 0 || 
        selectedColors.some(color => 
          product.color.toLowerCase().includes(color.toLowerCase())
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
        // Featured - keep original order but prioritize in-stock items
        filtered.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));
    }

    return filtered;
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

  const handleAddToCart = (product: Product, quantity: number) => {
    // TODO: Implement cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const activeFiltersCount = selectedCategories.length + selectedColors.length + 
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-subtle py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="w-fit mx-auto">
              {filteredProducts.length} Products
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
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
            <div className="lg:hidden">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
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
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
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

              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
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

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
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
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-6"
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
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
      <div className="space-y-3">
        <h4 className="font-medium">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={50000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-medium">Colors</h4>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorChange(color.id, !selectedColors.includes(color.id))}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color.id) 
                  ? 'border-primary scale-110' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
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
  onAddToCart: (product: Product, quantity: number) => void;
}

function ProductCard({ product, viewMode, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex p-6 gap-6">
          <div className="relative w-48 h-64 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                New
              </Badge>
            )}
            {!product.inStock && (
              <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                Sold Out
              </Badge>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground line-clamp-2">{product.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline">{product.fabric}</Badge>
              <Badge variant="outline">{product.color}</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-accent text-accent' 
                        : 'text-muted-foreground/30'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <span className="text-sm text-accent font-semibold">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                
                <ProductDetail
                  product={product}
                  onAddToCart={onAddToCart}
                  trigger={
                    <Button variant="outline">
                      View Details
                    </Button>
                  }
                />
                
                <Button
                  onClick={() => onAddToCart(product, 1)}
                  disabled={!product.inStock}
                  className="gradient-primary text-primary-foreground"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground shadow-lg">
              New
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-accent text-accent-foreground shadow-lg">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white shadow-lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {product.fabric}
            </Badge>
            <div className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full border border-border"
                style={{
                  backgroundColor: product.color.toLowerCase().includes('emerald') ? '#10b981' : 
                                 product.color.toLowerCase().includes('purple') ? '#8b5cf6' : 
                                 product.color.toLowerCase().includes('golden') || product.color.toLowerCase().includes('yellow') ? '#f59e0b' : 
                                 product.color.toLowerCase().includes('coral') || product.color.toLowerCase().includes('pink') ? '#ec4899' :
                                 product.color.toLowerCase().includes('blue') ? '#3b82f6' :
                                 product.color.toLowerCase().includes('red') ? '#ef4444' :
                                 product.color.toLowerCase().includes('green') ? '#22c55e' : '#6b7280'
                }}
              />
              <span className="text-xs text-muted-foreground">{product.color}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-accent text-accent' 
                    : 'text-muted-foreground/30'
                }`} 
              />
            ))}
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.reviews} reviews
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="text-sm text-accent font-semibold">
              Save ₹{((product.originalPrice || 0) - product.price).toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <ProductDetail
            product={product}
            onAddToCart={onAddToCart}
            trigger={
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
            }
          />
          <Button
            size="sm"
            onClick={() => onAddToCart(product, 1)}
            disabled={!product.inStock}
            className="flex-1 gradient-primary text-primary-foreground"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Catalog;