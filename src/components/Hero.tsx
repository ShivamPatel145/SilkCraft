import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Users,
  Package,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react";

const Hero = () => {
  const features = [
    {
      icon: Package,
      title: "Smart Inventory",
      description: "AI-powered stock management with real-time tracking"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics", 
      description: "Comprehensive business insights and reporting"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "360° customer profiles and relationship tracking"
    },
    {
      icon: Globe,
      title: "Multi-Channel Sales",
      description: "Online store, POS, and marketplace integration"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Products Managed" },
    { value: "₹50L+", label: "Revenue Processed" },
    { value: "500+", label: "Happy Businesses" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-subtle"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Section */}
        <div className="pt-24 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Announcement Badge */}
              <div className="flex justify-center lg:justify-start">
                <Badge variant="accent" className="px-6 py-3 text-sm font-semibold bg-accent/10 text-accent-foreground border-accent/20 shadow-card">
                  <Zap className="w-4 h-4 mr-2" />
                  New: AI-Powered Inventory Insights Released
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
                  <span className="block mb-2">Transform Your</span>
                  <span className="block gradient-hero bg-clip-text text-transparent mb-2">
                    Saree Business
                  </span>
                  <span className="block">with SilkCraft</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <p className="text-xl leading-relaxed text-muted-foreground">
                  The complete business management platform designed specifically for saree retailers. 
                  Manage inventory, boost sales, and delight customers with our AI-powered solution.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-primary text-primary-foreground px-10 py-4 text-lg font-semibold shadow-elegant hover:shadow-glow transition-smooth w-full sm:w-auto h-14 rounded-xl">
                    Start Free Trial
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/catalog">
                  <Button variant="outline" size="lg" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30 border-primary/20 text-primary w-full sm:w-auto h-14 rounded-xl">
                    View Demo
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="font-medium">Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-medium">4.9/5 Customer Rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative lg:block">
              <div className="relative">
                {/* Main Hero Image Container */}
                <div className="relative bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl overflow-hidden shadow-elegant">
                  <img 
                    src="/src/assets/hero-sarees.jpg" 
                    alt="Beautiful collection of premium sarees"
                    className="w-full h-[500px] object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.classList.remove('hidden');
                      }
                    }}
                  />
                  {/* Fallback Content */}
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/15">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-elegant">
                        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Premium Saree Collection</h3>
                      <p className="text-muted-foreground">Exquisite designs for every occasion</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-elegant p-3 z-10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Live Inventory</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-elegant p-4 z-10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10,000+</div>
                    <div className="text-xs text-muted-foreground">Products Managed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="pb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your saree business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-smooth border-border hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <Card className="gradient-subtle border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Trusted by Businesses Nationwide
                </h3>
                <p className="text-muted-foreground">
                  Join thousands of successful saree retailers using SilkCraft
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;