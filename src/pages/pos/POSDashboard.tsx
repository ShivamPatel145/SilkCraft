import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ShoppingCart, 
  Scan, 
  Calculator,
  CreditCard,
  Printer,
  User,
  Plus,
  Minus,
  Trash2
} from "lucide-react";

const POSDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Array<{
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    image: string;
  }>>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // Mock product data for quick access
  const quickProducts = [
    {
      id: "1",
      sku: "SAREE-0001",
      name: "Handloom Silk - Red",
      price: 3499,
      stock: 12,
      image: "/placeholder.svg"
    },
    {
      id: "2",
      sku: "SAREE-0002", 
      name: "Cotton Handloom - Blue",
      price: 1299,
      stock: 8,
      image: "/placeholder.svg"
    },
    {
      id: "3",
      sku: "SAREE-0003",
      name: "Designer Chiffon - Pink",
      price: 2799,
      stock: 15,
      image: "/placeholder.svg"
    },
    {
      id: "4",
      sku: "SAREE-0004",
      name: "Banarasi Silk - Gold",
      price: 5999,
      stock: 5,
      image: "/placeholder.svg"
    }
  ];

  const filteredProducts = quickProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof quickProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const handleCheckout = () => {
    // Navigate to POS checkout
    console.log("Proceeding to checkout with:", { cart, customerInfo, total });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Point of Sale</h1>
              <p className="text-muted-foreground">In-store sales and billing system</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Scan className="w-4 h-4 mr-2" />
                Scan Barcode
              </Button>
              <Button variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Calculator
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Search */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-lg"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">₹{product.price.toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {product.stock} left
                          </Badge>
                        </div>
                        <Button 
                          onClick={() => addToCart(product)}
                          className="w-full" 
                          size="sm"
                          disabled={product.stock === 0}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart & Checkout Section */}
            <div className="space-y-6">
              
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Customer Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                  <Input
                    placeholder="Email (Optional)"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </CardContent>
              </Card>

              {/* Cart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart ({cart.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 ml-1"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Bill Summary */}
              {cart.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bill Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (GST 18%)</span>
                        <span>₹{tax.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Button 
                        onClick={handleCheckout}
                        className="w-full" 
                        size="lg"
                        disabled={cart.length === 0}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Proceed to Payment
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Printer className="w-4 h-4 mr-2" />
                        Print Bill
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCart([])}
                        disabled={cart.length === 0}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default POSDashboard;