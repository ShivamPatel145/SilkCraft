import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("today");

  // Mock data - replace with actual API calls
  const stats = {
    todaySales: { value: 25680, change: 12.5, trend: "up" },
    totalOrders: { value: 148, change: -5.2, trend: "down" },
    totalCustomers: { value: 1284, change: 8.7, trend: "up" },
    lowStockItems: { value: 23, change: 0, trend: "neutral" }
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Priya Sharma",
      items: 2,
      total: 4799,
      status: "Pending",
      time: "2 mins ago"
    },
    {
      id: "ORD-002", 
      customer: "Anita Singh",
      items: 1,
      total: 3499,
      status: "Confirmed",
      time: "15 mins ago"
    },
    {
      id: "ORD-003",
      customer: "Meera Patel",
      items: 3,
      total: 8997,
      status: "Shipped",
      time: "1 hour ago"
    },
    {
      id: "ORD-004",
      customer: "Kavya Reddy",
      items: 1,
      total: 2299,
      status: "Delivered",
      time: "2 hours ago"
    }
  ];

  const lowStockProducts = [
    { name: "Banarasi Silk Saree - Gold", stock: 2, threshold: 10 },
    { name: "Cotton Handloom - Blue", stock: 1, threshold: 5 },
    { name: "Kanjivaram Silk - Red", stock: 3, threshold: 8 },
    { name: "Chiffon Saree - Pink", stock: 0, threshold: 5 }
  ];

  const topProducts = [
    { name: "Handloom Silk Saree", sales: 45, revenue: 157455 },
    { name: "Cotton Saree Collection", sales: 38, revenue: 49362 },
    { name: "Banarasi Special", sales: 29, revenue: 173710 },
    { name: "Designer Wedding Sarees", sales: 22, revenue: 198780 }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-background"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today's Sales</p>
                    <p className="text-2xl font-bold">₹{stats.todaySales.value.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      {stats.todaySales.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${stats.todaySales.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stats.todaySales.change > 0 ? "+" : ""}{stats.todaySales.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.totalOrders.value}</p>
                    <div className="flex items-center mt-2">
                      {stats.totalOrders.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${stats.totalOrders.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stats.totalOrders.change > 0 ? "+" : ""}{stats.totalOrders.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">{stats.totalCustomers.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">
                        +{stats.totalCustomers.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                    <p className="text-2xl font-bold">{stats.lowStockItems.value}</p>
                    <div className="flex items-center mt-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mr-1" />
                      <span className="text-sm text-orange-600">Requires attention</span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded">
                          <ShoppingCart className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.items} items • {order.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                        <Badge variant={getStatusVariant(order.status)} className="mt-1">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Low Stock Alert
                </CardTitle>
                <Button variant="outline" size="sm">
                  Manage Inventory
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Threshold: {product.threshold} units
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={product.stock === 0 ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {product.stock} left
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">#{index + 1}</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="font-medium mb-2">{product.name}</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sales:</span>
                        <span className="font-medium">{product.sales} units</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium">₹{product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;