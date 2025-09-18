import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Package,
  BarChart3,
  Users,
  Settings,
  LogIn,
  UserPlus,
  LogOut,
  Crown,
  Store,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"customer" | "cashier" | "admin" | null>("customer"); // Mock role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  type NavigationItem = {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  };

  const handleLogin = (role: "customer" | "cashier" | "admin") => {
    setUserRole(role);
    setIsLoggedIn(true);
    
    // Navigate to appropriate dashboard
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "cashier":
        navigate("/pos/dashboard");
        break;
      default:
        navigate("/user/dashboard");
        break;
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      { label: "Home", href: "/" },
      { label: "Catalog", href: "/catalog" },
    ];

    if (!isLoggedIn) {
      return baseItems;
    }

    if (userRole === "customer") {
      return [
        ...baseItems,
        { label: "Cart", href: "/cart", icon: ShoppingCart },
        { label: "Orders", href: "/orders" },
        { label: "Dashboard", href: "/user/dashboard", icon: User },
      ];
    }

    if (userRole === "cashier") {
      return [
        ...baseItems,
        { label: "POS", href: "/pos/dashboard", icon: Store },
        { label: "Inventory", href: "/inventory", icon: Package },
      ];
    }

    if (userRole === "admin") {
      return [
        ...baseItems,
        { label: "Admin", href: "/admin/dashboard", icon: Crown },
        { label: "Inventory", href: "/admin/inventory", icon: Package },
        { label: "Reports", href: "/admin/reports", icon: BarChart3 },
        { label: "Users", href: "/admin/users", icon: Users },
      ];
    }

    return baseItems;
  };

  const location = useLocation();
  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-border shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center shadow-elegant transform group-hover:scale-105 transition-smooth">
                  <svg 
                    className="w-8 h-8 text-primary-foreground" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    {/* Saree/Fabric Pattern */}
                    <path 
                      d="M3 12c0-9 9-9 9 0s9-9 9 0-9 9-9 0-9 9-9 0z" 
                      fill="rgba(255,255,255,0.2)"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <path 
                      d="M6 8c3 0 6 2 6 6s3-6 6-6M6 16c3 0 6-2 6-6s3 6 6 6" 
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.6"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 gradient-accent rounded-full border-2 border-white flex items-center justify-center shadow-card">
                  <span className="text-xs font-bold text-accent-foreground">✦</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-2xl gradient-hero bg-clip-text text-transparent">
                    SilkCraft
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                    PREMIUM SAREES
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-smooth flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm ${
                    isActive 
                      ? 'text-primary-foreground gradient-primary shadow-elegant' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  {item.label === "Cart" && getCartItemCount() > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs bg-white/90 text-primary font-semibold">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {userRole && (
              <Badge variant="outline" className="capitalize font-medium border-primary/20 text-primary bg-primary/5">
                <Crown className="w-3 h-3 mr-1" />
                {userRole}
              </Badge>
            )}
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-primary/5 text-foreground">
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/user/dashboard")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/cart")}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/30">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleLogin("customer")}>
                      <User className="w-4 h-4 mr-2" />
                      Customer Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogin("cashier")}>
                      <Store className="w-4 h-4 mr-2" />
                      Cashier Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogin("admin")}>
                      <Crown className="w-4 h-4 mr-2" />
                      Admin Login
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth" onClick={() => navigate("/register")}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn && userRole && (
              <Badge variant="outline" className="capitalize text-xs border-primary/20 text-primary">
                {userRole}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/5"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1 bg-card/95 backdrop-blur-sm">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg transition-smooth flex items-center justify-between ${
                    isActive 
                      ? 'text-primary bg-primary/10 font-medium' 
                      : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </div>
                  {item.label === "Cart" && getCartItemCount() > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Link>
              );
            })}
            
            <div className="px-4 pt-4 border-t border-border space-y-3">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/user/dashboard");
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-red-600"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogin("customer");
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login as Customer
                  </Button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="w-full justify-start gradient-primary text-primary-foreground"
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;