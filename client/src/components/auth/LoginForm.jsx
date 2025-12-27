import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  Wrench,
  User,
  UserCog,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { roleRedirect } from "../../utils/roleRedirect";

const TEMP_USERS = {
  technician: {
    email: "tech@gearguard.com",
    password: "tech@123",
    label: "Tech", // Shortened for mobile
    fullLabel: "Technician",
    icon: <Wrench size={16} />,
    hint: "Field maintenance & repair logs",
  },
  manager: {
    email: "manager@gearguard.com",
    password: "manager@123",
    label: "Manager",
    fullLabel: "Manager",
    icon: <User size={16} />,
    hint: "Schedules & resource planning",
  },
  admin: {
    email: "admin@gearguard.com",
    password: "admin@123",
    label: "Admin",
    fullLabel: "Admin",
    icon: <UserCog size={16} />,
    hint: "System config & user management",
  },
};

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState("technician");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const role = TEMP_USERS[activeRole];

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email !== role.email || password !== role.password) {
      setError(`Invalid credentials for ${role.fullLabel} access.`);
      setIsLoading(false);
      return;
    }

    login(activeRole);
    navigate(roleRedirect(activeRole));
  }

  const fillCredentials = () => {
    setEmail(role.email);
    setPassword(role.password);
  };

  return (
    // Added overflow-y-auto to handle short landscape mobile screens
    <div className="min-h-dvh bg-[#0F172A] flex items-center justify-center p-0 sm:p-4 md:p-6 font-sans overflow-y-auto">
      {/* Container: Full width on mobile, max-width on desktop */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-slate-900/50 sm:rounded-3xl overflow-hidden border-y sm:border border-white/10 shadow-2xl">
        {/* LEFT SECTION: VISUAL (Desktop Only) */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758"
              alt="Industrial"
              className="w-full h-full object-cover opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-2xl tracking-tight">
              <div className="p-2 bg-teal-400/10 rounded-lg">
                <Wrench size={24} />
              </div>
              GearGuard
            </div>
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-white leading-tight"
            >
              Precision in <br />
              <span className="text-teal-400">Maintenance.</span>
            </motion.h2>
            <p className="text-slate-400 mt-4 max-w-sm text-lg">
              The central OS for industrial reliability and team
              synchronization.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: FORM */}
        <div className="p-6 sm:p-8 md:p-12 bg-slate-900 flex flex-col justify-center min-h-dvh sm:min-h-0">
          {/* Mobile Logo: Only visible on small screens */}
          <div className="lg:hidden flex items-center gap-2 text-teal-400 font-bold text-xl mb-8">
            <div className="p-1.5 bg-teal-400/10 rounded-lg">
              <Wrench size={20} />
            </div>
            GearGuard
          </div>

          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Select your workspace to continue
            </p>
          </div>

          {/* ROLE TABS: Responsive text sizes */}
          <div className="flex p-1 bg-slate-800 rounded-xl mb-6 md:mb-8 relative">
            {Object.entries(TEMP_USERS).map(([key, r]) => {
              const isActive = activeRole === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveRole(key);
                    setError("");
                    setEmail("");
                    setPassword("");
                  }}
                  className={`relative flex-1 py-2.5 text-xs sm:text-sm font-medium transition-colors z-10 flex items-center justify-center gap-1.5 ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-teal-400 rounded-lg shadow-lg"
                      transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.2,
                      }}
                    />
                  )}
                  <span className="relative z-20 flex items-center gap-1.5">
                    {r.icon} {r.label}
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-xs sm:text-sm flex items-center gap-3"
                >
                  <ShieldAlert size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Work Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role.email}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400/20 focus:border-teal-400 transition-all text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-400">
                  Password
                </label>
                <NavLink
                  to="/forgot-password"
                  size="sm"
                  className="text-xs text-teal-400 hover:underline"
                >
                  Forgot?
                </NavLink>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400/20 focus:border-teal-400 transition-all text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-teal-400 hover:bg-teal-300 disabled:opacity-70 text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-teal-400/10 mt-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In as {role.label}
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* DEMO TIP: Responsive margins */}
          <div className="mt-6 md:mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                <User size={16} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-slate-300 font-medium leading-tight truncate sm:whitespace-normal">
                  {role.hint}
                </p>
                <button
                  onClick={fillCredentials}
                  className="text-[10px] uppercase tracking-wider text-teal-400 font-bold mt-1.5 hover:text-teal-300 transition-colors"
                >
                  Auto-fill Credentials
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 md:mt-8 text-center text-[10px] sm:text-xs text-slate-500">
            Secure enterprise login. Managed by GearGuard IT.
          </p>
        </div>
      </div>
    </div>
  );
}
