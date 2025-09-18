import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline" | "accent" | "premium";
  };
  className?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badge,
  className = "",
  onClick,
  isClickable = false
}: StatsCardProps) => {
  const cardClasses = `${className} ${isClickable ? 'cursor-pointer hover:shadow-elegant transition-shadow' : ''}`;

  const renderTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.isPositive === true) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (trend.isPositive === false) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (trend?.isPositive === true) return "text-green-500";
    if (trend?.isPositive === false) return "text-red-500";
    return "text-muted-foreground";
  };

  const CardComponent = isClickable ? Button : "div";
  const cardProps = isClickable 
    ? { variant: "ghost" as const, className: "h-auto p-0 w-full", onClick }
    : { className: cardClasses };

  return (
    <CardComponent {...cardProps}>
      <Card className={isClickable ? "w-full" : cardClasses}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {badge && (
              <Badge variant={badge.variant || "default"} className="text-xs">
                {badge.text}
              </Badge>
            )}
            {icon && (
              <div className="text-muted-foreground">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            
            <div className="flex items-center justify-between">
              {subtitle && (
                <p className="text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
              
              {trend && (
                <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
                  {renderTrendIcon()}
                  <span>{trend.value}% {trend.label}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </CardComponent>
  );
};

export default StatsCard;