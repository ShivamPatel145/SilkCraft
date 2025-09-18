import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Store,
  FileText,
  Bell,
  Search,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }: AdminSidebarProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      badge: null
    },
    {
      label: "Products",
      icon: Package,
      href: "/admin/products",
      badge: "245"
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
      badge: "12"
    },
    {
      label: "Inventory",
      icon: Store,
      href: "/admin/inventory",
      badge: "Low: 23"
    },
    {
      label: "Customers",
      icon: Users,
      href: "/admin/users",
      badge: "1,284"
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/admin/reports",
      badge: null
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      badge: null
    }
  ];

  const quickActions = [
    {
      label: "Add Product",
      href: "/admin/products/new",
      className: "bg-primary text-white hover:bg-primary/90"
    },
    {
      label: "View POS",
      href: "/pos/dashboard",
      className: "bg-accent text-white hover:bg-accent/90"
    }
  ];

  return (
    <Card className={`h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} border-r`}>
      <CardContent className="p-0 h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
                <p className="text-sm text-muted-foreground">SilkCraft</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
          
          {!isCollapsed && (
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Quick search..."
                className="pl-10 h-8"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'}`} />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"} 
                        className="ml-auto text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Button 
                  className={`w-full justify-start text-sm ${action.className}`}
                  size="sm"
                >
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {/* User Info */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@silkcraft.com</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;