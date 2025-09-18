import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to SilkCraft!",
        });
        
        // Navigate to appropriate dashboard based on user role
        // The AuthContext will handle storing user data
        navigate("/");
      } else {
        setErrors({ submit: result.error || "Login failed" });
        toast({
          title: "Login Failed",
          description: result.error || "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements - matching home page */}
      <div className="absolute inset-0 gradient-subtle"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl"></div>
      
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Back to Home Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Logo/Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-block">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-accent mr-3" />
                <h1 className="text-4xl font-heading font-bold gradient-hero bg-clip-text text-transparent">
                  SilkCraft
                </h1>
              </div>
              <p className="text-lg text-muted-foreground font-medium">
                Premium Saree Business Management
              </p>
            </Link>
          </div>

          {/* Login Form */}
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center pb-8">
              <CardTitle className="text-3xl font-heading">Welcome Back</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sign in to your SilkCraft account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-12 h-12 border-2 rounded-xl transition-smooth ${
                        errors.email 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-12 pr-12 h-12 border-2 rounded-xl transition-smooth ${
                        errors.password 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, rememberMe: checked === true }))
                      }
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary-glow transition-smooth"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-smooth rounded-xl" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8">
                <Separator className="my-6" />
                <div className="space-y-4">
                  <p className="text-sm text-center text-muted-foreground font-medium">
                    Demo Credentials
                  </p>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-center">
                      <span className="font-semibold text-foreground">Admin:</span>{" "}
                      <span className="text-muted-foreground">admin@silkcraft.com / admin123</span>
                    </div>
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-center">
                      <span className="font-semibold text-foreground">Cashier:</span>{" "}
                      <span className="text-muted-foreground">cashier@silkcraft.com / cashier123</span>
                    </div>
                    <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg text-center">
                      <span className="font-semibold text-foreground">Customer:</span>{" "}
                      <span className="text-muted-foreground">customer@example.com / customer123</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary-glow font-semibold transition-smooth"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 SilkCraft. Crafted with ❤️ for saree businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;