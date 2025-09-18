import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useCartWithNavigation } from "@/hooks/useCartWithNavigation";
import { Product } from "@/data/products";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
  Crown,
} from "lucide-react";

// Mock saree data
const sampleSarees = [
  {
    id: 1,
    name: "Royal Emerald Silk",
    price: 15999,
    originalPrice: 19999,
    fabric: "Pure Silk",
    color: "Emerald Green",
    rating: 4.8,
    reviews: 124,
    image: "https://cdn.shopify.com/s/files/1/1027/2035/products/SRN9040-1.jpg?v=1651490111",
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Purple Banarasi Heritage",
    price: 12999,
    originalPrice: 15999,
    fabric: "Banarasi Silk",
    color: "Royal Purple",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop",
    isNew: false,
    inStock: true,
  },
  {
    id: 3,
    name: "Golden Kanjivaram Classic",
    price: 18999,
    originalPrice: 22999,
    fabric: "Kanjivaram Silk",
    color: "Golden Yellow",
    rating: 4.7,
    reviews: 156,
    image: "https://cdn.shopify.com/s/files/1/1760/4649/products/kanjivaram-saree-subtle-gold-woven-kanjivaram-saree-special-wedding-edition-silk-saree-online-14595996483687.jpg?v=1648621362",
    isNew: true,
    inStock: false,
  },
  {
    id: 4,
    name: "Coral Pink Georgette",
    price: 8999,
    originalPrice: 11999,
    fabric: "Georgette",
    color: "Coral Pink",
    rating: 4.6,
    reviews: 73,
    image: "https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/d/i/digital-printed-georgette-saree-in-peach-v1-spf9079.jpg",
    isNew: false,
    inStock: true,
  },
];

const ProductShowcase = () => {
  const { addItem } = useCartWithNavigation();

  const handleAddToCart = async (saree: typeof sampleSarees[0]) => {
    // Convert saree to Product format
    const productToAdd: Product = {
      id: saree.id,
      name: saree.name,
      price: saree.price,
      originalPrice: saree.originalPrice,
      fabric: saree.fabric,
      color: saree.color,
      category: "Sarees",
      subcategory: "Silk Sarees",
      rating: saree.rating,
      reviews: saree.reviews,
      images: [saree.image],
      description: `Beautiful ${saree.fabric} saree in ${saree.color}`,
      features: ["Handwoven", "Premium Quality", "Traditional Design"],
      specifications: {
        fabric: saree.fabric,
        weave: "Traditional",
        length: "6.5m",
        width: "1.15m",
        blousePiece: true,
        careInstructions: ["Dry clean only", "Store in cool dry place"],
        origin: "India"
      },
      isNew: saree.isNew,
      inStock: saree.inStock,
      stockQuantity: 10,
      tags: [saree.fabric, saree.color],
      discount: saree.originalPrice ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100) : undefined
    };
    
    await addItem(productToAdd);
  };
  return (
    <section className="py-20 gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-accent-foreground font-semibold tracking-wide text-sm uppercase">
              Top Collection
            </span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="block">Handpicked</span>
            <span className="block gradient-hero bg-clip-text text-transparent">
              Premium Sarees
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Carefully curated collection of our finest sarees from master weavers across India. 
            Each piece tells a story of tradition, craftsmanship, and timeless elegance.
          </p>
        </div>


        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {sampleSarees.map((saree, index) => (
            <Card
              key={saree.id}
              className={`group hover:shadow-elegant transition-smooth border-border hover:border-primary/30 overflow-hidden bg-card/90 backdrop-blur-sm hover:bg-card relative h-full flex flex-col ${index === 0 ? 'lg:ring-2 lg:ring-primary/20 lg:ring-offset-2' : ''}`}
            >
              <div className="relative overflow-hidden rounded-t-lg h-80 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                <img
                  src={saree.image}
                  alt={saree.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-smooth"
                />
                
                {/* Premium Badge for First Item */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-accent via-accent to-accent/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-elegant">
                      <Crown className="w-3 h-3 text-accent-foreground" />
                      <span className="text-xs font-bold text-accent-foreground tracking-wide">
                        BESTSELLER
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                  {saree.isNew && (
                    <Badge className="text-xs bg-primary text-primary-foreground shadow-elegant border-0 font-semibold">
                      New Arrival
                    </Badge>
                  )}
                  {!saree.inStock && (
                    <Badge variant="destructive" className="text-xs shadow-elegant font-semibold">
                      Sold Out
                    </Badge>
                  )}
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth z-20" style={{marginTop: saree.isNew || !saree.inStock ? '2.5rem' : '0'}}>
                  <Button variant="ghost" size="icon" className="bg-white/95 hover:bg-white shadow-elegant backdrop-blur-sm">
                    <Heart className="w-4 h-4 text-primary" />
                  </Button>
                </div>
                
                {/* Fabric Type Overlay */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-white text-xs font-semibold">
                      {saree.fabric}
                    </span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
                <div className="space-y-2 flex-grow">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-smooth leading-tight line-clamp-2 min-h-[3.5rem] flex items-center">
                    {saree.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm" 
                      style={{
                        backgroundColor: saree.color.toLowerCase().includes('emerald') ? '#10b981' : 
                                       saree.color.toLowerCase().includes('purple') ? '#8b5cf6' : 
                                       saree.color.toLowerCase().includes('golden') || saree.color.toLowerCase().includes('yellow') ? '#f59e0b' : 
                                       saree.color.toLowerCase().includes('coral') || saree.color.toLowerCase().includes('pink') ? '#ec4899' : '#6b7280'
                      }}
                    ></div>
                    <p className="text-muted-foreground font-medium text-sm">
                      {saree.color}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(saree.rating) ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`} 
                      />
                    ))}
                    <span className="text-sm font-semibold text-foreground ml-1">{saree.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {saree.reviews} reviews
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-primary">
                      ₹{saree.price.toLocaleString()}
                    </span>
                    {saree.originalPrice && (
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{saree.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-accent">
                          {Math.round((1 - saree.price / saree.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 mt-auto">
                  <Button
                    variant={saree.inStock ? "outline" : "secondary"}
                    size="default"
                    className={`w-full h-11 transition-smooth font-semibold ${
                      saree.inStock 
                        ? "border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-card hover:shadow-elegant" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    disabled={!saree.inStock}
                    onClick={() => handleAddToCart(saree)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {saree.inStock ? "Add to Cart" : "Notify When Available"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Explore Our Complete Collection
            </h3>
            <p className="text-muted-foreground mb-8">
              Over 1,000+ premium sarees awaiting your discovery. From traditional to contemporary designs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group gradient-primary text-primary-foreground px-8 py-4 text-lg font-semibold shadow-elegant hover:shadow-glow transition-smooth" asChild>
              <Link to="/catalog">
                Explore All Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-primary/30 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-smooth" asChild>
              <Link to="/catalog?filter=new">
                View New Arrivals
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;