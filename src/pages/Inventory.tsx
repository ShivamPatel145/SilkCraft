import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";

const Inventory = () => {
  const inventory = [
    {
      id: 1,
      name: "Royal Emerald Silk",
      sku: "RES001",
      category: "Silk Sarees",
      price: 15999,
      stock: 12,
      lowStockThreshold: 5,
      status: "in_stock",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&h=130&fit=crop",
    },
    {
      id: 2,
      name: "Purple Banarasi Heritage",
      sku: "PBH002",
      category: "Banarasi Sarees",
      price: 12999,
      stock: 3,
      lowStockThreshold: 5,
      status: "low_stock",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=130&fit=crop",
    },
    {
      id: 3,
      name: "Golden Kanjivaram Classic",
      sku: "GKC003",
      category: "Kanjivaram Sarees",
      price: 18999,
      stock: 0,
      lowStockThreshold: 5,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1594736797933-d0301ba1fe65?w=100&h=130&fit=crop",
    },
    {
      id: 4,
      name: "Coral Pink Georgette",
      sku: "CPG004",
      category: "Georgette Sarees",
      price: 8999,
      stock: 18,
      lowStockThreshold: 5,
      status: "in_stock",
      image: "https://images.unsplash.com/photo-1583391733981-3d2b462e6d84?w=100&h=130&fit=crop",
    },
  ];

  const getStatusBadge = (status: string, stock: number) => {
    switch (status) {
      case "in_stock":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">In Stock ({stock})</Badge>;
      case "low_stock":
        return <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Low Stock ({stock})</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const totalItems = inventory.length;
  const inStock = inventory.filter(item => item.status === "in_stock").length;
  const lowStock = inventory.filter(item => item.status === "low_stock").length;
  const outOfStock = inventory.filter(item => item.status === "out_of_stock").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">
              Manage your saree stock and inventory levels
            </p>
          </div>
          
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground">{inStock}</div>
              <div className="text-sm text-muted-foreground">In Stock</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground">{lowStock}</div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground">{outOfStock}</div>
              <div className="text-sm text-muted-foreground">Out of Stock</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products by name, SKU, or category..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="ghost">
                  Category
                </Button>
                <Button variant="ghost">
                  Stock Level
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-muted-foreground">Product</th>
                    <th className="p-4 font-medium text-muted-foreground">SKU</th>
                    <th className="p-4 font-medium text-muted-foreground">Category</th>
                    <th className="p-4 font-medium text-muted-foreground">Price</th>
                    <th className="p-4 font-medium text-muted-foreground">Stock</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{item.sku}</td>
                      <td className="p-4 text-muted-foreground">{item.category}</td>
                      <td className="p-4 font-medium text-foreground">₹{item.price.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="text-foreground">
                          {item.stock}
                          {item.stock <= item.lowStockThreshold && item.stock > 0 && (
                            <AlertTriangle className="inline w-4 h-4 ml-1 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(item.status, item.stock)}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Inventory;