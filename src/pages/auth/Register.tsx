import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Mail, Lock, Phone, Crown, Store, UserCheck, ArrowLeft, Sparkles } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "customer",
    businessName: "",
    adminCode: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    if (formData.role === "admin" && formData.adminCode !== "SILK2024ADMIN") {
      newErrors.adminCode = "Invalid admin code";
    }

    if (formData.role === "business" && !formData.businessName.trim()) {
      newErrors.businessName = "Business name is required for business accounts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      const userData = {
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        businessName: formData.businessName || null
      };
      
      // Store user data (in real app, handle JWT tokens properly)
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Redirect based on role
      switch (formData.role) {
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
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
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

          {/* Registration Form */}
          <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center pb-8">
              <CardTitle className="text-3xl font-heading">Create Account</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`pl-12 h-12 border-2 rounded-xl transition-smooth ${
                          errors.firstName 
                            ? "border-destructive focus:border-destructive" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <div className="relative">
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`h-12 border-2 rounded-xl transition-smooth ${
                          errors.lastName 
                            ? "border-destructive focus:border-destructive" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

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

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`pl-12 h-12 border-2 rounded-xl transition-smooth ${
                        errors.phone 
                          ? "border-destructive focus:border-destructive" 
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gender (Optional)</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger className={`h-12 border-2 rounded-xl transition-smooth ${
                      errors.gender 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Account Type/Role Field */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Account Type</Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger className={`h-12 border-2 rounded-xl transition-smooth ${
                      errors.role 
                        ? "border-destructive focus:border-destructive" 
                        : "border-border focus:border-primary"
                    }`}>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Customer - Browse and purchase sarees</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="cashier">
                        <div className="flex items-center space-x-2">
                          <Store className="w-4 h-4" />
                          <span>Cashier - Handle store transactions</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4" />
                          <span>Admin - Full system access</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-destructive">{errors.role}</p>
                  )}
                </div>

                {/* Business Name Field - Show only for business/cashier accounts */}
                {(formData.role === "cashier") && (
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
                    <div className="relative">
                      <Store className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="businessName"
                        name="businessName"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className={`pl-12 h-12 border-2 rounded-xl transition-smooth ${
                          errors.businessName 
                            ? "border-destructive focus:border-destructive" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.businessName && (
                      <p className="text-sm text-destructive">{errors.businessName}</p>
                    )}
                  </div>
                )}

                {/* Admin Code Field - Show only for admin accounts */}
                {formData.role === "admin" && (
                  <div className="space-y-2">
                    <Label htmlFor="adminCode" className="text-sm font-medium">Admin Access Code</Label>
                    <div className="relative">
                      <Crown className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="adminCode"
                        name="adminCode"
                        type="password"
                        placeholder="Enter admin access code"
                        value={formData.adminCode}
                        onChange={handleInputChange}
                        className={`pl-12 h-12 border-2 rounded-xl transition-smooth ${
                          errors.adminCode 
                            ? "border-destructive focus:border-destructive" 
                            : "border-border focus:border-primary"
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.adminCode && (
                      <p className="text-sm text-destructive">{errors.adminCode}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Contact your system administrator for the admin access code
                    </p>
                  </div>
                )}

                {/* Password Fields */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-12 pr-12 h-12 border-2 rounded-xl transition-smooth ${
                        errors.confirmPassword 
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary-glow transition-smooth">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary-glow transition-smooth">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
                  )}
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
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary-glow font-semibold transition-smooth"
                  >
                    Sign in
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

export default Register;