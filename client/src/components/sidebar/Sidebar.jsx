import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  ClipboardList,
  ShieldCheck,
  Users,
  Wrench,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

/* ---------------- ICON MAP ---------------- */
const ICON_MAP = {
  dashboard: LayoutDashboard,
  tasks: ClipboardList,
  users: Users,
  security: ShieldCheck,
  settings: Settings,
  wrench: Wrench,
  calendar: Calendar,
  chart: BarChart3,
};

/* ---------------- SIDEBAR CONFIG ---------------- */
const MOCK_CONFIG = {
  technician: [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "My Tasks", path: "/maintenance", icon: "tasks" },
    { label: "Equipment", path: "/equipment", icon: "wrench" },
    { label: "Account Settings", path: "/settings", icon: "settings" },
  ],

  manager: [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Maintenance", path: "/maintenance", icon: "tasks" },
    { label: "Equipment", path: "/equipment", icon: "wrench" },
    { label: "Account Settings", path: "/settings", icon: "settings" },
  ],

  admin: [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Maintenance", path: "/maintenance", icon: "tasks" },
    { label: "Equipment", path: "/equipment", icon: "wrench" },
    { label: "Reports", path: "/reports", icon: "chart" },
    {label: "Config", path: "/config", icon: "tasks"},
    { label: "Account Settings", path: "/settings", icon: "settings" },
  ],
};

/* ---------------- SIDEBAR ---------------- */
export default function Sidebar() {
  const { user } = useAuthStore();

  /* 🔐 STRICT BACKEND ALIGNMENT */
  if (!user?.role) return null;

  const roleKey = user.role.toLowerCase();
  const items = MOCK_CONFIG[roleKey] || [];

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col
                 w-20 lg:w-64 bg-[#0F172A] border-r border-white/5
                 transition-all duration-300 ease-in-out"
    >
      {/* LOGO */}
      <div className="flex items-center justify-center lg:justify-start lg:px-6 h-16 md:h-20 border-b border-white/5">
        <div className="p-2 bg-teal-400/10 rounded-xl text-teal-400">
          <Wrench size={18} strokeWidth={3} />
        </div>
        <span className="hidden lg:block ml-3 font-black tracking-tighter text-white uppercase italic">
          GEAR<span className="text-teal-400">GUARD</span>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto no-scrollbar">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon] || Wrench;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-teal-400/10 text-teal-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`shrink-0 transition-transform ${
                      isActive ? "scale-110" : ""
                    }`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <span className="hidden lg:block text-sm font-semibold tracking-wide whitespace-nowrap">
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="sidebarActive"
                      className="absolute left-0 w-1 h-6 bg-teal-400 rounded-r-full shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                    />
                  )}

                  {/* Mobile Tooltip */}
                  <div
                    className="lg:hidden absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[10px]
                               uppercase font-bold rounded-md opacity-0 pointer-events-none
                               group-hover:opacity-100 transition-opacity z-60
                               shadow-xl border border-white/10"
                  >
                    {item.label}
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER STATUS */}
      <div className="p-4 border-t border-white/5 hidden lg:block">
        <div className="bg-slate-800/30 rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Node 01 Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
