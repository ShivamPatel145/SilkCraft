import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: "completed" | "current" | "pending" | "cancelled";
  icon?: ReactNode;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline" | "accent" | "premium";
  };
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  }[];
  metadata?: Record<string, string | number>;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
  variant?: "vertical" | "horizontal";
  showConnectors?: boolean;
}

const Timeline = ({ 
  events, 
  className = "", 
  variant = "vertical",
  showConnectors = true 
}: TimelineProps) => {
  const getStatusColor = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500 border-green-500";
      case "current":
        return "bg-primary border-primary";
      case "pending":
        return "bg-muted border-border";
      case "cancelled":
        return "bg-red-500 border-red-500";
      default:
        return "bg-muted border-border";
    }
  };

  const getStatusTextColor = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-700";
      case "current":
        return "text-primary";
      case "pending":
        return "text-muted-foreground";
      case "cancelled":
        return "text-red-700";
      default:
        return "text-muted-foreground";
    }
  };

  if (variant === "horizontal") {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {events.map((event, index) => (
              <div key={event.id} className="flex items-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusColor(event.status)}`}>
                    {event.icon ? (
                      <div className="text-white w-4 h-4">{event.icon}</div>
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="text-center space-y-1">
                    <p className={`text-sm font-medium ${getStatusTextColor(event.status)}`}>
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.timestamp}
                    </p>
                    {event.badge && (
                      <Badge variant={event.badge.variant} className="text-xs">
                        {event.badge.text}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {index < events.length - 1 && showConnectors && (
                  <div className="flex-1 mx-4">
                    <Separator className="h-px" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {/* Connector Line */}
          {index < events.length - 1 && showConnectors && (
            <div className="absolute left-4 top-8 w-px h-16 bg-border" />
          )}
          
          <div className="flex gap-4">
            {/* Timeline Dot */}
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusColor(event.status)} flex-shrink-0`}>
              {event.icon ? (
                <div className="text-white w-4 h-4">{event.icon}</div>
              ) : (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            
            {/* Content */}
            <Card className="flex-1">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${getStatusTextColor(event.status)}`}>
                        {event.title}
                      </h3>
                      {event.badge && (
                        <Badge variant={event.badge.variant} className="text-xs">
                          {event.badge.text}
                        </Badge>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      {event.timestamp}
                    </p>
                    
                    {event.metadata && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(event.metadata).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {event.actions && event.actions.length > 0 && (
                    <div className="flex gap-1">
                      {event.actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || "outline"}
                          size="sm"
                          onClick={action.onClick}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;