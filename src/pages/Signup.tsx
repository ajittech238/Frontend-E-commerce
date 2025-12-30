import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Check,
  Chrome,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!formData.agreeTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (formData.fullName && formData.email && formData.password) {
        toast.success("Account created successfully! 🎉");
        navigate("/");
      } else {
        toast.error("Please fill in all fields");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-lime-500";
    return "bg-emerald-500";
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength === 0) return "Very Weak";
    if (strength <= 1) return "Weak";
    if (strength <= 2) return "Fair";
    if (strength <= 3) return "Good";
    if (strength <= 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-gradient/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-gradient/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10 animate-in fade-in slide-in-from-top duration-700">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Zenith
              </span>
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground text-base">
              Join millions discovering handcrafted treasures
            </p>
          </div>

          {/* Signup Card */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="relative rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-2xl overflow-hidden">
              <div className="relative z-10 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-5 pr-4 py-3 rounded-xl border-2 border-border/50 bg-background/50 focus:border-primary focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-5 pr-4 py-3 rounded-xl border-2 border-border/50 bg-background/50 focus:border-primary focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-5 pr-12 py-3 rounded-xl border-2 border-border/50 bg-background/50 focus:border-primary focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-300",
                                i < passwordStrength
                                  ? getPasswordStrengthColor(passwordStrength)
                                  : "bg-border/30"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground">
                          Strength: <span className="text-foreground">{getPasswordStrengthLabel(passwordStrength)}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-5 pr-12 py-3 rounded-xl border-2 border-border/50 bg-background/50 focus:border-primary focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-2 border-primary/50 bg-pink-gradient/10 cursor-pointer accent-primary mt-1 flex-shrink-0"
                    />
                    <label htmlFor="terms" className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary/80 font-semibold">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary/80 font-semibold">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Sign Up Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary hover:shadow-2xl hover:shadow-primary/40 text-white font-bold py-3 h-auto rounded-xl shadow-lg transition-all duration-300 group/btn gap-3 text-base relative overflow-hidden mt-6"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? "Creating account..." : "Create Account"}
                      {!isLoading && (
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                  </Button>
                </form>

                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/50 dark:bg-slate-900/50 text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Sign Up */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-border/50 hover:border-primary/50 hover:bg-pink-gradient/5 rounded-xl py-3 h-auto font-semibold transition-all duration-300 group/social"
                  >
                    <Chrome className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-border/50 hover:border-primary/50 hover:bg-pink-gradient/5 rounded-xl py-3 h-auto font-semibold transition-all duration-300 group/social"
                  >
                    <Github className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                  </Button>
                </div>

                {/* Sign In Link */}
                <p className="text-center mt-8 text-muted-foreground font-medium">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-10 space-y-3 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            {[
              "✓ 100% Free to Create an Account",
              "✓ Discover Handcrafted Artisan Products",
              "✓ Exclusive Rewards & Loyalty Program",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-slate-800/30"
              >
                <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
