import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const isStrong = password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      {/* 1. Increased max-width from 'md' to 'lg' or 480px for more horizontal breathing room */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-120 bg-slate-900 border border-white/10 rounded-4xl p-10 shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div key="reset-form" exit={{ opacity: 0, scale: 0.95 }}>
              {/* Header section with more bottom margin */}
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-teal-400/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <KeyRound className="text-teal-400" size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Set New Password
                </h2>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  Ensure your account remains secure with a strong, unique
                  password.
                </p>
              </div>

              {/* 2. Increased vertical gap between fields (space-y-7) */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* New Password */}
                <div className="relative">
                  <label className="block text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-1">
                    New Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/20 focus:border-teal-400 transition-all placeholder:text-slate-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* 3. Subtle Strength Meter - Moved slightly lower to avoid "squeezing" the input */}
                  <div className="flex gap-1.5 mt-3 px-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                          password.length > i * 2
                            ? isStrong
                              ? "bg-teal-400"
                              : "bg-yellow-500"
                            : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <ShieldCheck
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        passwordsMatch ? "text-teal-400" : "text-slate-500"
                      }`}
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className={`w-full bg-slate-800/50 border rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all placeholder:text-slate-600 ${
                        confirmPassword && !passwordsMatch
                          ? "border-red-500/50 focus:ring-red-500/20"
                          : "border-slate-700 focus:ring-teal-400/20 focus:border-teal-400"
                      }`}
                      required
                    />
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-xs mt-2 ml-1 flex items-center gap-1.5 font-medium"
                    >
                      <AlertCircle size={14} /> Passwords do not match
                    </motion.p>
                  )}
                </div>

                {/* 4. Taller Button for better touch targets and balance */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading || !passwordsMatch || !isStrong}
                  type="submit"
                  className="w-full bg-teal-400 hover:bg-teal-300 disabled:opacity-50 disabled:grayscale text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-400/10 mt-4"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    "Update Credentials"
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* Success Screen with lots of whitespace */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                <CheckCircle2 className="text-emerald-400" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Security Updated
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Your new password has been set. You can now use it to access
                your GearGuard account.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-2xl transition-all border border-slate-700 shadow-lg"
              >
                Sign In Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
