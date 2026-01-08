
import { useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email) {
        toast.success(`Password reset link sent to ${email} 🎉`);
        navigate("/login");
      } else {
        toast.error("Please enter your email address");
      }
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
      <div className="relative z-10 w-full h-[500px] max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-card/60 backdrop-blur-xl border border-white/10">
        
        {/* ================= LEFT IMAGE PANEL ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex flex-col justify-between p-8"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Regain access <br /> to your account
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Enter your email to receive a secure link to reset your password.
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
            Forgot Password?
          </h1>
          <p className="text-muted-foreground mb-8">
            No worries, we'll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email address
              </label>
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 rounded-xl"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-bold shadow-lg hover:shadow-primary/40"
            >
              {isLoading ? "Sending link..." : "Send Reset Link"}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link
              to="/login"
              className="font-bold text-primary hover:underline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
