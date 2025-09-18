import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Truck,
  MapPin,
  Phone,
  Mail,
  Edit,
  Plus
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - replace with actual state management
  const cartItems = [
    {
      id: "1",
      name: "Handloom Silk Saree - Red",
      variant: "Red, 6.5m",
      price: 3499,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "Cotton Saree - Blue",
      variant: "Blue, 6m",
      price: 1299,
      quantity: 2,
      image: "/placeholder.svg"
    }
  ];

  const addresses = [
    {
      id: "0",
      type: "Home",
      name: "Priya Sharma",
      line1: "A-123, Sector 15",
      line2: "Near Metro Station",
      city: "Noida",
      state: "UP",
      pincode: "201301",
      phone: "+91 9876543210"
    },
    {
      id: "1", 
      type: "Office",
      name: "Priya Sharma",
      line1: "B-456, IT Park",
      line2: "Tower C, 5th Floor",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      phone: "+91 9876543210"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const discount = 200; // Coupon discount
  const total = subtotal + shipping + tax - discount;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to order confirmation
      navigate("/orders/ORD-20250917-001");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {addresses.map((address) => (
                      <div key={address.id} className="space-y-2">
                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                          <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{address.type}</Badge>
                              <span className="font-medium">{address.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {address.line1}, {address.line2}<br />
                              {address.city}, {address.state} - {address.pincode}<br />
                              <Phone className="w-3 h-3 inline mr-1" />
                              {address.phone}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.variant}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                        <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Wallet className="w-5 h-5" />
                      <div>
                        <Label htmlFor="upi" className="font-medium">UPI</Label>
                        <p className="text-sm text-muted-foreground">Pay with Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Building2 className="w-5 h-5" />
                      <div>
                        <Label htmlFor="netbanking" className="font-medium">Net Banking</Label>
                        <p className="text-sm text-muted-foreground">Pay through your bank account</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Truck className="w-5 h-5" />
                      <div>
                        <Label htmlFor="cod" className="font-medium">Cash on Delivery</Label>
                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Add any special instructions for your order..."
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹{shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (GST)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>Estimated delivery: 3-5 days</span>
                    </div>
                    
                    <Button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full" 
                      size="lg"
                    >
                      {isProcessing ? "Processing..." : `Place Order - ₹${total.toLocaleString()}`}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By placing this order, you agree to our Terms & Conditions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;