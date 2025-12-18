import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Github,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (formData.email && formData.password) {
        toast.success("Login successful! Welcome back 🎉");
        navigate("/");
      } else {
        toast.error("Please fill in all fields");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Zenith
              </span>
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-lg">
              Sign in to explore unique handcrafted treasures
            </p>
          </div>

          {/* Login Card */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="relative rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 shadow-2xl overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-5 pr-4 py-3.5 rounded-xl border-2 border-border/50 bg-background/50 focus:border-primary focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2 group">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Lock className="h-4 w-4 text-primary" />
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-5 pr-12 py-3.5 rounded-xl border-2 border-border/50 bg-background/50 focus:border-primary focus:bg-background transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
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
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="remember"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-2 border-primary/50 bg-primary/10 cursor-pointer accent-primary"
                    />
                    <label htmlFor="remember" className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      Keep me logged in
                    </label>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary hover:shadow-2xl hover:shadow-primary/40 text-white font-bold py-3.5 h-auto rounded-xl shadow-lg transition-all duration-300 group/btn gap-3 text-base relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? "Signing in..." : "Sign In"}
                      {!isLoading && (
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none" />
                  </Button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/50 dark:bg-slate-900/50 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Sign In */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 rounded-xl py-3 h-auto font-semibold transition-all duration-300 group/social"
                  >
                    <Chrome className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 rounded-xl py-3 h-auto font-semibold transition-all duration-300 group/social"
                  >
                    <Github className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                  </Button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center mt-8 text-muted-foreground font-medium">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            {[
              { icon: "🔒", label: "Secure" },
              { icon: "⚡", label: "Fast" },
              { icon: "✓", label: "Verified" },
            ].map((badge, i) => (
              <div
                key={i}
                className="text-center p-3 rounded-xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-slate-800/30"
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <p className="text-xs font-semibold text-foreground">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
