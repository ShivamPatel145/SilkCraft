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
import { 
  CreditCard, 
  Banknote, 
  Wallet, 
  Building2,
  Printer,
  Mail,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

const POSCheckout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock cart data (would come from state management)
  const cartItems = [
    {
      id: "1",
      name: "Handloom Silk Saree - Red",
      quantity: 1,
      price: 3499
    },
    {
      id: "2",
      name: "Cotton Handloom - Blue", 
      quantity: 2,
      price: 1299
    }
  ];

  const customerInfo = {
    name: "Priya Sharma",
    phone: "+91 9876543210",
    email: "priya@example.com"
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
  const change = cashReceived ? Math.max(0, parseInt(cashReceived) - total) : 0;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 2000);
  };

  const handlePrintReceipt = () => {
    // Handle receipt printing
    window.print();
  };

  const handleNewSale = () => {
    navigate("/pos");
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <div className="mb-6">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground">
                    Transaction completed successfully
                  </p>
                </div>

                <div className="space-y-2 mb-6 text-left">
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">₹{total.toLocaleString()}</span>
                  </div>
                  {paymentMethod === "cash" && (
                    <>
                      <div className="flex justify-between">
                        <span>Cash Received:</span>
                        <span>₹{parseInt(cashReceived).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Change:</span>
                        <span>₹{change.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="capitalize">{paymentMethod}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handlePrintReceipt} className="w-full">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Receipt
                  </Button>
                  <Button variant="outline" onClick={handleNewSale} className="w-full">
                    New Sale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate("/pos")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to POS
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">Complete the payment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Payment Section */}
            <div className="space-y-6">
              
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input value={customerInfo.name} readOnly />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={customerInfo.phone} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={customerInfo.email} readOnly />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Banknote className="w-5 h-5" />
                      <div>
                        <Label htmlFor="cash" className="font-medium">Cash Payment</Label>
                        <p className="text-sm text-muted-foreground">Pay with cash</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <Label htmlFor="card" className="font-medium">Card Payment</Label>
                        <p className="text-sm text-muted-foreground">Credit/Debit card</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Wallet className="w-5 h-5" />
                      <div>
                        <Label htmlFor="upi" className="font-medium">UPI Payment</Label>
                        <p className="text-sm text-muted-foreground">PhonePe, GPay, Paytm</p>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "cash" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <Label htmlFor="cashReceived">Cash Received</Label>
                        <Input
                          id="cashReceived"
                          type="number"
                          placeholder="Enter amount received"
                          value={cashReceived}
                          onChange={(e) => setCashReceived(e.target.value)}
                        />
                      </div>
                      {cashReceived && parseInt(cashReceived) >= total && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                          <p className="text-sm font-medium text-green-800">
                            Change to return: ₹{change.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {cashReceived && parseInt(cashReceived) < total && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                          <p className="text-sm font-medium text-red-800">
                            Insufficient amount: ₹{(total - parseInt(cashReceived)).toLocaleString()} more needed
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (GST 18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={handlePayment}
                      disabled={isProcessing || (paymentMethod === "cash" && (!cashReceived || parseInt(cashReceived) < total))}
                      className="w-full" 
                      size="lg"
                    >
                      {isProcessing ? "Processing..." : `Complete Payment - ₹${total.toLocaleString()}`}
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Receipt via Email
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    Payment will be processed securely
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

export default POSCheckout;