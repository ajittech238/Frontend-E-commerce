import { useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

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

  /* ---------------- Aurora Effect ---------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const auroraBackground = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}px ${mouseY}px,
      hsla(260, 90%, 60%, 0.12),
      transparent 80%
    )
  `;

  /* ---------------- Handlers ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.agreeTerms) {
      toast.error("Please accept terms & conditions");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Account created successfully 🎉");
      navigate("/login");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background p-4"
    >
      {/* Aurora */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: auroraBackground }}
      />

      {/* main card */}
      <div className="relative z-10 w-full max-w-5xl h-[700px] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-card/60 backdrop-blur-xl border border-white/10">
        
        {/* ================= LEFT IMAGE PANEL ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}  
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex flex-col justify-between p-8"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Zenith Store
              </span>
            </Link>
          </div>

          <motion.div
            className="relative z-10 max-w-md"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Create your account <br /> start shopping today
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Join thousands of happy customers shopping premium products.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-10"
        >
          <h1 className="text-4xl font-extrabold text-foreground mb-2">
            Create account
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign up to continue shopping
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full name
              </label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="h-12 rounded-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-12 rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Confirm password
              </label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="accent-primary"
              />
              I agree to the{" "}
              <Link to="/terms" className="text-primary font-semibold">
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/privacy" className="text-primary font-semibold">
                Privacy Policy
              </Link>
            </label>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-bold shadow-lg hover:shadow-primary/40"
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
