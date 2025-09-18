import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  IndianRupee,
  Calendar,
  Download,
} from "lucide-react";

const Reports = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹12,45,890",
      change: "+12.5%",
      icon: IndianRupee,
      trend: "up",
    },
    {
      title: "Orders",
      value: "348",
      change: "+8.2%",
      icon: ShoppingCart,
      trend: "up",
    },
    {
      title: "Customers",
      value: "1,247",
      change: "+5.1%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Products Sold",
      value: "456",
      change: "-2.3%",
      icon: Package,
      trend: "down",
    },
  ];

  const topProducts = [
    { name: "Royal Emerald Silk", sales: 45, revenue: "₹7,19,955" },
    { name: "Purple Banarasi Heritage", sales: 38, revenue: "₹4,93,962" },
    { name: "Golden Kanjivaram Classic", sales: 32, revenue: "₹6,07,968" },
    { name: "Coral Pink Georgette", sales: 28, revenue: "₹2,51,972" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Sales Reports</h1>
            <p className="text-muted-foreground">
              Analytics and insights for your saree business
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              This Month
            </Button>
            <Button variant="hero">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                      {index + 1}
                    </Badge>
                    <div>
                      <h4 className="font-medium text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">New order received</p>
                    <p className="text-xs text-muted-foreground">Order #ORD004 - ₹15,999</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Product updated</p>
                    <p className="text-xs text-muted-foreground">Royal Emerald Silk - Stock updated</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15 min ago</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Low stock alert</p>
                    <p className="text-xs text-muted-foreground">Purple Banarasi Heritage - Only 3 left</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Order delivered</p>
                    <p className="text-xs text-muted-foreground">Order #ORD001 - Customer confirmed</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reports;