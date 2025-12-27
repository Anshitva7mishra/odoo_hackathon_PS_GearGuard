import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Bell,
  Search,
  Settings,
  User as UserIcon,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Topbar() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  const userRole = user?.role || "Guest";
  const userName = user?.name || "User"; 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "dashboard") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 md:h-20 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
      
      <div className="flex flex-col ml-10 lg:ml-0">
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em]">
          <span>Workspace</span>
          <span className="text-slate-700">/</span>
          <span className="text-teal-400/80">{getPageTitle()}</span>
        </div>
        <h1 className="text-white font-bold text-sm md:text-lg tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      
      <div className="flex items-center gap-2 md:gap-6">
       
        <div className="relative group hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search assets..."
            className="bg-slate-800/40 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 w-32 lg:w-64 focus:outline-none focus:ring-2 focus:ring-teal-400/20 focus:border-teal-400/40 transition-all"
          />
        </div>

        
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-400 rounded-full border-2 border-slate-900"></span>
        </button>

        
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer py-2 group">
            <div className="text-right">
              
              <p className="text-sm font-bold text-white leading-none capitalize">
                {userName}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 font-medium capitalize">
                {userRole}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-teal-400 shadow-lg group-hover:border-teal-400/50 transition-all">
              <UserIcon size={20} />
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full pt-2 w-52"
              >
                <div className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl p-2 backdrop-blur-xl">
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-teal-400/10 hover:text-teal-400 rounded-xl transition-all"
                  >
                    <Settings size={16} /> Account Settings
                  </Link>
                  <div className="h-px bg-white/5 my-1 mx-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <LogOut size={16} /> End Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

       
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors border border-white/5 ml-1"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 md:hidden overflow-hidden z-40 shadow-2xl"
          >
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center gap-4 p-4 mb-2 bg-slate-800/50 rounded-2xl border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400">
                  <UserIcon size={24} />
                </div>
                <div>
                 
                  <p className="text-white font-bold capitalize">{userName}</p>
                  <p className="text-[10px] text-teal-400 flex items-center gap-1 uppercase tracking-widest">
                    <ShieldCheck size={10} /> {userRole}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/5 my-2 mx-4" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-4 w-full p-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left font-medium"
              >
                <LogOut size={20} /> Logout Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
