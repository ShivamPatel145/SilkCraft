import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  Search, 
  AlertTriangle, 
  TrendingDown, 
  Plus,
  Download,
  Upload,
  Edit,
  BarChart3
} from "lucide-react";

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);

  // Mock inventory data
  const inventory = [
    {
      id: "1",
      sku: "SAREE-0001",
      name: "Handloom Silk Saree - Red",
      currentStock: 12,
      minThreshold: 10,
      maxThreshold: 50,
      status: "Good",
      lastUpdated: "2025-09-15",
      costPrice: 2800,
      totalValue: 33600
    },
    {
      id: "2", 
      sku: "SAREE-0002",
      name: "Cotton Handloom - Blue",
      currentStock: 3,
      minThreshold: 5,
      maxThreshold: 30,
      status: "Low Stock",
      lastUpdated: "2025-09-14",
      costPrice: 900,
      totalValue: 2700
    },
    {
      id: "3",
      sku: "SAREE-0003", 
      name: "Banarasi Silk - Golden",
      currentStock: 0,
      minThreshold: 8,
      maxThreshold: 25,
      status: "Out of Stock",
      lastUpdated: "2025-09-10",
      costPrice: 4500,
      totalValue: 0
    },
    {
      id: "4",
      sku: "SAREE-0004",
      name: "Chiffon Designer - Pink", 
      currentStock: 45,
      minThreshold: 15,
      maxThreshold: 50,
      status: "Overstock",
      lastUpdated: "2025-09-16",
      costPrice: 2100,
      totalValue: 94500
    }
  ];

  const [adjustmentData, setAdjustmentData] = useState({
    productId: "",
    type: "increase",
    quantity: "",
    reason: "",
    notes: ""
  });

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good': return 'default';
      case 'low stock': return 'secondary';
      case 'out of stock': return 'destructive';
      case 'overstock': return 'outline';
      default: return 'outline';
    }
  };

  const getStockIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'low stock':
      case 'out of stock':
        return <AlertTriangle className="w-4 h-4" />;
      case 'overstock':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockCount = inventory.filter(item => item.status === "Low Stock").length;
  const outOfStockCount = inventory.filter(item => item.status === "Out of Stock").length;

  const handleStockAdjustment = () => {
    console.log("Stock adjustment:", adjustmentData);
    setIsAdjustmentOpen(false);
    setAdjustmentData({
      productId: "",
      type: "increase",
      quantity: "",
      reason: "",
      notes: ""
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
              <h1 className="text-3xl font-bold">Inventory Management</h1>
              <p className="text-muted-foreground">
                Monitor stock levels and manage inventory adjustments
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Dialog open={isAdjustmentOpen} onOpenChange={setIsAdjustmentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Stock Adjustment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Stock Adjustment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Select Product</Label>
                      <Select value={adjustmentData.productId} onValueChange={(value) => 
                        setAdjustmentData(prev => ({ ...prev, productId: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose product" />
                        </SelectTrigger>
                        <SelectContent>
                          {inventory.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} ({item.sku})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Adjustment Type</Label>
                        <Select value={adjustmentData.type} onValueChange={(value) =>
                          setAdjustmentData(prev => ({ ...prev, type: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="increase">Increase Stock</SelectItem>
                            <SelectItem value="decrease">Decrease Stock</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          value={adjustmentData.quantity}
                          onChange={(e) => setAdjustmentData(prev => ({ ...prev, quantity: e.target.value }))}
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Reason</Label>
                      <Select value={adjustmentData.reason} onValueChange={(value) =>
                        setAdjustmentData(prev => ({ ...prev, reason: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="purchase">New Purchase</SelectItem>
                          <SelectItem value="return">Customer Return</SelectItem>
                          <SelectItem value="damaged">Damaged Goods</SelectItem>
                          <SelectItem value="theft">Theft/Loss</SelectItem>
                          <SelectItem value="correction">Stock Correction</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Notes (Optional)</Label>
                      <Textarea
                        value={adjustmentData.notes}
                        onChange={(e) => setAdjustmentData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Additional notes..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsAdjustmentOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleStockAdjustment}>
                        Apply Adjustment
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{inventory.length}</p>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">₹{totalInventoryValue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{lowStockCount}</p>
                    <p className="text-sm text-muted-foreground">Low Stock</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{outOfStockCount}</p>
                    <p className="text-sm text-muted-foreground">Out of Stock</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by product name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="good">Good Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="overstock">Overstock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Product</th>
                      <th className="text-left p-3">Current Stock</th>
                      <th className="text-left p-3">Thresholds</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Value</th>
                      <th className="text-left p-3">Last Updated</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.sku}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStockIcon(item.status)}
                            <span className="font-medium">{item.currentStock}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p>Min: {item.minThreshold}</p>
                            <p>Max: {item.maxThreshold}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <p className="font-medium">₹{item.totalValue.toLocaleString()}</p>
                            <p className="text-muted-foreground">@₹{item.costPrice}</p>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {item.lastUpdated}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 mr-1" />
                              Adjust
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
      </div>

      <Footer />
    </div>
  );
};

export default AdminInventory;