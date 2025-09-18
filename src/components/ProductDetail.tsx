import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailProps {
  product: Product;
  trigger: React.ReactNode;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductDetail({ product, trigger, onAddToCart }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto p-0">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-muted/30">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">New Arrival</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-accent text-accent-foreground">
                    {discountPercentage}% OFF
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive">Sold Out</Badge>
                )}
              </div>

              {/* Image Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex-1 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.fabric}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                
                {/* Rating */}
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
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-sm text-accent font-semibold">
                    You save ₹{((product.originalPrice || 0) - product.price).toLocaleString()} ({discountPercentage}% off)
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Color & Fabric */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Color:</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{
                        backgroundColor: product.color.toLowerCase().includes('emerald') ? '#10b981' : 
                                       product.color.toLowerCase().includes('purple') ? '#8b5cf6' : 
                                       product.color.toLowerCase().includes('golden') || product.color.toLowerCase().includes('yellow') ? '#f59e0b' : 
                                       product.color.toLowerCase().includes('coral') || product.color.toLowerCase().includes('pink') ? '#ec4899' :
                                       product.color.toLowerCase().includes('blue') ? '#3b82f6' :
                                       product.color.toLowerCase().includes('red') ? '#ef4444' :
                                       product.color.toLowerCase().includes('green') ? '#22c55e' :
                                       product.color.toLowerCase().includes('white') || product.color.toLowerCase().includes('ivory') ? '#f8fafc' : '#6b7280'
                      }}
                    />
                    <span className="text-sm">{product.color}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                        disabled={quantity >= product.stockQuantity}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Max {product.stockQuantity} items
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full h-12 gradient-primary text-primary-foreground font-semibold"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Zap className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center space-y-1">
                  <Truck className="w-5 h-5 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center space-y-1">
                  <RotateCcw className="w-5 h-5 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Easy Returns</p>
                </div>
                <div className="text-center space-y-1">
                  <Shield className="w-5 h-5 mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground">Authentic</p>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-8">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="care">Care Guide</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-4 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="mt-4">
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border/50">
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <span className="text-muted-foreground">
                          {Array.isArray(value) ? value.join(', ') : value.toString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="care" className="mt-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Care Instructions:</h4>
                    <ul className="space-y-2">
                      {product.specifications.careInstructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-accent rounded-full" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Origin:</strong> {product.specifications.origin}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}