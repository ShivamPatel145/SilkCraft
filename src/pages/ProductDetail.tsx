import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartWithNavigation } from "@/hooks/useCartWithNavigation";
import { Product } from "@/data/products";
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCartWithNavigation();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    const productToAdd: Product = {
      id: parseInt(id || "1"),
      name: product.name,
      price: currentVariant.price,
      originalPrice: currentVariant.mrp,
      fabric: product.specifications.Fabric,
      color: currentVariant.color,
      category: product.category,
      subcategory: "Silk Sarees",
      rating: product.rating,
      reviews: product.reviewCount,
      images: product.images,
      description: product.description,
      features: product.features,
      specifications: {
        fabric: product.specifications.Fabric,
        weave: product.specifications.Work,
        length: "6.5m",
        width: "1.15m",
        blousePiece: true,
        careInstructions: [product.specifications.Care],
        origin: product.specifications.Origin
      },
      isNew: false,
      inStock: currentVariant.stock > 0,
      stockQuantity: currentVariant.stock,
      tags: [product.specifications.Fabric, currentVariant.color],
      discount: currentVariant.mrp ? Math.round(((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100) : undefined
    };
    
    for (let i = 0; i < quantity; i++) {
      await addItem(productToAdd);
    }
  };

  // Mock product data - replace with API call
  const product = {
    id: id || "1",
    name: "Handloom Silk Saree - Elegant Red",
    sku: "SAREE-0001",
    description: "Beautiful handwoven silk saree with intricate gold zari border work. Perfect for weddings and special occasions.",
    category: "Silk Sarees",
    rating: 4.8,
    reviewCount: 127,
    variants: [
      { id: "v1", color: "Red", size: "6.5m", price: 3499, mrp: 3999, stock: 12, image: "/placeholder.svg" },
      { id: "v2", color: "Blue", size: "6.5m", price: 3299, mrp: 3999, stock: 8, image: "/placeholder.svg" },
      { id: "v3", color: "Green", size: "6.5m", price: 3799, mrp: 4299, stock: 5, image: "/placeholder.svg" },
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    features: [
      "100% Pure Silk",
      "Handwoven",
      "Gold Zari Work",
      "6.5 meters length",
      "Blouse piece included"
    ],
    specifications: {
      "Fabric": "Pure Silk",
      "Work": "Zari",
      "Occasion": "Wedding, Festival",
      "Care": "Dry Clean Only",
      "Origin": "Varanasi",
      "Weight": "700 grams"
    }
  };

  const currentVariant = product.variants[selectedVariant];
  const discount = Math.round(((currentVariant.mrp - currentVariant.price) / currentVariant.mrp) * 100);

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase' && quantity < currentVariant.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer border-2 border-transparent hover:border-primary">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h3 className="font-semibold mb-3">Available Variants</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((variant, index) => (
                  <Card 
                    key={variant.id}
                    className={`cursor-pointer transition-colors ${selectedVariant === index ? 'border-primary bg-primary/5' : 'hover:border-gray-300'}`}
                    onClick={() => setSelectedVariant(index)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-sm font-medium">{variant.color}</div>
                      <div className="text-xs text-muted-foreground">{variant.size}</div>
                      <div className="text-sm font-semibold">₹{variant.price.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">₹{currentVariant.price.toLocaleString()}</span>
                <span className="text-xl text-muted-foreground line-through">₹{currentVariant.mrp.toLocaleString()}</span>
                <Badge variant="destructive">{discount}% OFF</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${currentVariant.stock > 10 ? 'bg-green-500' : currentVariant.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                {currentVariant.stock > 10 ? 'In Stock' : currentVariant.stock > 0 ? `Only ${currentVariant.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange('increase')}
                    disabled={quantity >= currentVariant.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {currentVariant.stock} available
                </span>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1" 
                  size="lg"
                  disabled={currentVariant.stock === 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">Delivered by 22 Sep, Tuesday</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">7 Days Return & Exchange</p>
                    <p className="text-sm text-muted-foreground">Easy returns & exchanges</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Authenticity Guaranteed</p>
                    <p className="text-sm text-muted-foreground">100% genuine products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                  <p className="text-muted-foreground">Reviews feature coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
                  <div className="space-y-3">
                    <p>• Dry clean only - do not wash at home</p>
                    <p>• Store in a cool, dry place away from direct sunlight</p>
                    <p>• Use silk hangers or fold carefully with acid-free tissue paper</p>
                    <p>• Avoid contact with perfumes, deodorants, and harsh chemicals</p>
                    <p>• Iron on low heat with a cloth between the saree and iron</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;