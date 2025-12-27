import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShieldQuestion,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Header Icon */}
              <div className="w-16 h-16 bg-teal-400/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <ShieldQuestion className="text-teal-400" size={32} />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Forgot Password?
                </h2>
                <p className="text-slate-400">
                  Enter your work email and we'll send you a link to reset your
                  password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Work Email
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors"
                      size={18}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400/20 focus:border-teal-400 transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-teal-400 hover:bg-teal-300 disabled:opacity-70 text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-teal-400/10"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Check your email
              </h2>
              <p className="text-slate-400 mb-8">
                We've sent a password reset link to <br />
                <span className="text-white font-medium">{email}</span>
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-teal-400 text-sm font-semibold hover:text-teal-300 transition-colors"
              >
                Didn't receive the email? Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Login */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
