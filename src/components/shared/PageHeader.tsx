import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline" | "accent" | "premium";
  };
  actions?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "hero" | "accent" | "premium";
    disabled?: boolean;
  }[];
  dropdownActions?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    destructive?: boolean;
  }[];
  className?: string;
  children?: ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  backTo,
  backLabel = "Back",
  badge,
  actions = [],
  dropdownActions = [],
  className = "",
  children
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <Card className={`mb-6 ${className}`}>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            {backTo !== undefined && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="w-fit -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backLabel}
              </Button>
            )}
            
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-2xl lg:text-3xl font-bold">
                  {title}
                </CardTitle>
                {badge && (
                  <Badge variant={badge.variant || "default"}>
                    {badge.text}
                  </Badge>
                )}
              </div>
              {subtitle && (
                <p className="text-muted-foreground mt-1 text-sm lg:text-base">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                size="sm"
                onClick={action.onClick}
                disabled={action.disabled}
                className="flex items-center gap-2"
              >
                {action.icon}
                <span className="hidden sm:inline">{action.label}</span>
                <span className="sm:hidden">{action.icon ? "" : action.label}</span>
              </Button>
            ))}
            
            {dropdownActions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {dropdownActions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className={action.destructive ? "text-destructive" : ""}
                    >
                      {action.icon && (
                        <span className="mr-2">{action.icon}</span>
                      )}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default PageHeader;