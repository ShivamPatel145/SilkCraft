import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Upload,
  Package,
  Tag,
  IndianRupee
} from "lucide-react";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Mock product data
  const products = [
    {
      id: "1",
      sku: "SAREE-0001",
      name: "Handloom Silk Saree - Red",
      category: "Silk Sarees",
      price: 3499,
      mrp: 3999,
      stock: 12,
      status: "Active",
      image: "/placeholder.svg",
      fabric: "Pure Silk",
      color: "Red"
    },
    {
      id: "2",
      sku: "SAREE-0002", 
      name: "Cotton Handloom - Blue",
      category: "Cotton Sarees",
      price: 1299,
      mrp: 1599,
      stock: 8,
      status: "Active",
      image: "/placeholder.svg",
      fabric: "Cotton",
      color: "Blue"
    },
    {
      id: "3",
      sku: "SAREE-0003",
      name: "Banarasi Silk - Golden",
      category: "Silk Sarees", 
      price: 5999,
      mrp: 7999,
      stock: 0,
      status: "Out of Stock",
      image: "/placeholder.svg",
      fabric: "Banarasi Silk",
      color: "Golden"
    },
    {
      id: "4",
      sku: "SAREE-0004",
      name: "Chiffon Designer - Pink",
      category: "Designer Sarees",
      price: 2799,
      mrp: 3299,
      stock: 15,
      status: "Active",
      image: "/placeholder.svg",
      fabric: "Chiffon",
      color: "Pink"
    }
  ];

  const categories = [
    "All Categories",
    "Silk Sarees",
    "Cotton Sarees", 
    "Designer Sarees",
    "Wedding Sarees",
    "Casual Sarees"
  ];

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    fabric: "",
    color: "",
    price: "",
    mrp: "",
    stock: "",
    description: "",
    tags: ""
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'out of stock': return 'destructive';
      case 'inactive': return 'secondary';
      default: return 'outline';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    // Handle product creation
    console.log("Adding product:", newProduct);
    setIsAddProductOpen(false);
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      fabric: "",
      color: "",
      price: "",
      mrp: "",
      stock: "",
      description: "",
      tags: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Product Management</h1>
              <p className="text-muted-foreground">
                Manage your saree inventory and product catalog
              </p>
            </div>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
                      <TabsTrigger value="details">Details & Images</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name*</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sku">SKU*</Label>
                          <Input
                            id="sku"
                            value={newProduct.sku}
                            onChange={(e) => handleInputChange("sku", e.target.value)}
                            placeholder="SAREE-0001"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category*</Label>
                          <Select value={newProduct.category} onValueChange={(value) => handleInputChange("category", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.slice(1).map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fabric">Fabric*</Label>
                          <Select value={newProduct.fabric} onValueChange={(value) => handleInputChange("fabric", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fabric" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="silk">Silk</SelectItem>
                              <SelectItem value="cotton">Cotton</SelectItem>
                              <SelectItem value="chiffon">Chiffon</SelectItem>
                              <SelectItem value="georgette">Georgette</SelectItem>
                              <SelectItem value="crepe">Crepe</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="color">Color*</Label>
                        <Input
                          id="color"
                          value={newProduct.color}
                          onChange={(e) => handleInputChange("color", e.target.value)}
                          placeholder="Enter color"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pricing" className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="price">Selling Price*</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            placeholder="3499"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mrp">MRP*</Label>
                          <Input
                            id="mrp"
                            type="number"
                            value={newProduct.mrp}
                            onChange={(e) => handleInputChange("mrp", e.target.value)}
                            placeholder="3999"
                          />
                        </div>
                        <div>
                          <Label htmlFor="stock">Stock Quantity*</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => handleInputChange("stock", e.target.value)}
                            placeholder="10"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Enter product description"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={newProduct.tags}
                          onChange={(e) => handleInputChange("tags", e.target.value)}
                          placeholder="wedding, bridal, premium"
                        />
                      </div>
                      
                      <div>
                        <Label>Product Images</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop images here or click to upload
                          </p>
                          <Button variant="outline" className="mt-2">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddProduct}>
                      Add Product
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {product.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{product.stock} in stock</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <Card className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== "all" 
                  ? "Try adjusting your search criteria" 
                  : "Get started by adding your first product"}
              </p>
              <Button onClick={() => setIsAddProductOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminProducts;