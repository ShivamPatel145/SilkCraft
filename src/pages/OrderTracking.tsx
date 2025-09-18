import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Truck, 
  MapPin, 
  Calendar,
  Download,
  MessageCircle,
  Phone,
  CheckCircle,
  Clock,
  ArrowLeft
} from "lucide-react";

const OrderTracking = () => {
  const { orderId } = useParams();

  // Mock order data - replace with API call
  const order = {
    id: orderId || "ORD-20250917-001",
    orderNumber: "ORD-20250917-001",
    date: "2025-09-15",
    status: "Out for Delivery",
    estimatedDelivery: "2025-09-18",
    total: 4799,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    shippingAddress: {
      name: "Priya Sharma",
      line1: "A-123, Sector 15",
      line2: "Near Metro Station", 
      city: "Noida",
      state: "UP",
      pincode: "201301",
      phone: "+91 9876543210"
    },
    items: [
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
        quantity: 1,
        image: "/placeholder.svg"
      }
    ],
    trackingNumber: "TRK123456789",
    courierPartner: "Blue Dart Express",
    timeline: [
      {
        status: "Order Placed",
        description: "Your order has been placed successfully",
        timestamp: "2025-09-15T10:30:00Z",
        completed: true
      },
      {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being prepared", 
        timestamp: "2025-09-15T14:20:00Z",
        completed: true
      },
      {
        status: "Packed",
        description: "Your order has been packed and ready for dispatch",
        timestamp: "2025-09-16T09:15:00Z", 
        completed: true
      },
      {
        status: "Shipped",
        description: "Your order has been shipped via Blue Dart Express",
        timestamp: "2025-09-16T16:45:00Z",
        completed: true
      },
      {
        status: "Out for Delivery",
        description: "Your order is out for delivery and will reach you soon",
        timestamp: "2025-09-18T08:30:00Z",
        completed: true,
        current: true
      },
      {
        status: "Delivered",
        description: "Your order has been delivered successfully",
        timestamp: null,
        completed: false
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'out for delivery': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'packed': return 'bg-orange-500';
      case 'confirmed': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
              <p className="text-muted-foreground">Placed on {formatDate(order.date)}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></div>
                <Badge variant="outline" className="text-sm">{order.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Expected delivery: {formatDate(order.estimatedDelivery)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Order Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            event.completed 
                              ? event.current 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {event.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </div>
                          {index < order.timeline.length - 1 && (
                            <div className={`w-0.5 h-12 ${event.completed ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${event.current ? 'text-blue-600' : ''}`}>
                              {event.status}
                            </h4>
                            {event.timestamp && (
                              <span className="text-sm text-muted-foreground">
                                {formatDate(event.timestamp)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
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

              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-1">Tracking Number</p>
                      <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Courier Partner</p>
                      <p className="text-sm text-muted-foreground">{order.courierPartner}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Delivery Address
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.line1}, {order.shippingAddress.line2}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                      <p>{order.shippingAddress.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Order Total</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Method</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Status</span>
                    <Badge variant="outline" className="text-xs">
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Customer Support</p>
                    <p className="text-sm font-medium">+91 1800-123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri 9AM-7PM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Delivery Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Delivery Instructions</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Please ring the doorbell. If no one is available, call the provided number.
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

export default OrderTracking;