import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  CheckCircle,
  Clock,
  Truck,
  MapPin,
  Eye,
} from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      total: 28998,
      status: "delivered",
      items: [
        {
          name: "Royal Emerald Silk",
          image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&h=130&fit=crop",
          price: 15999,
          quantity: 1,
        },
        {
          name: "Purple Banarasi Heritage",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=130&fit=crop",
          price: 12999,
          quantity: 1,
        },
      ],
      trackingNumber: "TRK123456789",
      expectedDelivery: "2024-01-20",
    },
    {
      id: "ORD002",
      date: "2024-01-18",
      total: 18999,
      status: "shipped",
      items: [
        {
          name: "Golden Kanjivaram Classic",
          image: "https://images.unsplash.com/photo-1594736797933-d0301ba1fe65?w=100&h=130&fit=crop",
          price: 18999,
          quantity: 1,
        },
      ],
      trackingNumber: "TRK987654321",
      expectedDelivery: "2024-01-25",
    },
    {
      id: "ORD003",
      date: "2024-01-20",
      total: 8999,
      status: "processing",
      items: [
        {
          name: "Coral Pink Georgette",
          image: "https://images.unsplash.com/photo-1583391733981-3d2b462e6d84?w=100&h=130&fit=crop",
          price: 8999,
          quantity: 1,
        },
      ],
      trackingNumber: "TRK456789123",
      expectedDelivery: "2024-01-28",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case "shipped":
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Shipped</Badge>;
      case "processing":
        return <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your saree orders
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-card">
              <CardContent className="p-6">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-2 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-semibold text-foreground">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(order.status)}
                    <div className="text-right">
                      <div className="font-bold text-foreground">₹{order.total.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="grid gap-4 mb-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">₹{item.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Info */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Expected Delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tracking: {order.trackingNumber}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm">
                        <Truck className="w-4 h-4 mr-2" />
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;