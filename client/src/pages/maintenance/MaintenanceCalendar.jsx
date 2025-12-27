import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useGearGuardStore } from "../../store/useGearGuardStore";
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronRight,
  X,
  Layout,
  Zap,
  Clock,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MaintenanceCalendar() {
  const { user } = useAuthStore();
  const { addTask, tasks } = useGearGuardStore();

  // UI States
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Normal");

  // Current Role (Strictly from Store)
  if (!user?.role) {
  return null; // or loading / redirect
}

const role = user.role.toLowerCase();

if (role !== "manager") {
  return (
    <div className="text-center text-red-400 font-bold">
      Unauthorized Access
    </div>
  );
}



  // Task Dispatch Logic
  const handleDispatch = (e) => {
    e.preventDefault();
    if (!name) return;

    // Dispatching to Global Store
    addTask({
      name,
      priority,
      equipment: "UNIT-NODE-01", // Demo Equipment
    });

    // Reset & Close
    setName("");
    setPriority("Normal");
    setIsOpen(false);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 animate-in fade-in duration-700 max-w-7xl mx-auto overflow-x-hidden">
      {/* --- CYBER HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-brand animate-pulse" />
            <p className="text-[10px] font-black text-brand uppercase tracking-[0.4em] italic">
              Strategy Terminal
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase italic leading-none">
            Maintenance <span className="text-brand">Calendar</span>
          </h1>
        </div>

        {/* Schedule Button (Manager Only) */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-full md:w-auto bg-brand text-base font-black px-8 py-4 rounded-2xl uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} /> Schedule Mission
        </button>
      </header>

      {/* --- CALENDAR GRID INTERFACE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Grid Placeholder (Responsive 320px) */}
        <div className="lg:col-span-8 bg-surface/30 border border-white/5 rounded-[2.5rem] p-6 h-75 md:h-112.5 flex flex-col items-center justify-center border-dashed relative group overflow-hidden">
          <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <CalendarIcon size={64} className="text-white/5 mb-4 animate-pulse" />
          <p className="text-secondary uppercase tracking-[0.5em] text-[10px] font-black text-center px-4 leading-loose">
            Visual Timeline Stream <br />
            <span className="text-brand/40 italic">
              Waiting for Neural Sync...
            </span>
          </p>
        </div>

        {/* Right: Agenda Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Layout size={14} className="text-brand" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">
                Agenda Feed
              </h3>
            </div>
            <span className="text-[9px] font-mono text-secondary uppercase">
              Synced
            </span>
          </div>

          <div className="space-y-4">
            {tasks
              .slice(0, 5)
              .reverse()
              .map((t, idx) => (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={t.id}
                  className="bg-surface border border-white/5 rounded-2xl p-5 flex items-center justify-between group hover:border-brand/40 hover:bg-white/5 transition-all cursor-pointer shadow-xl"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-primary truncate group-hover:text-brand transition-colors">
                      {t.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock size={10} className="text-secondary" />
                      <p className="text-[9px] text-secondary font-mono uppercase tracking-tighter">
                        {t.time || "Scheduled"} • {t.equipment}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-secondary group-hover:translate-x-1 group-hover:text-brand transition-all shrink-0"
                  />
                </motion.div>
              ))}

            {tasks.length === 0 && (
              <p className="text-center py-10 text-[10px] uppercase tracking-widest text-white/10 italic">
                No Missions Logged
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- DISPATCH AUTHORIZATION MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-base/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-[0_0_80px_rgba(162,123,161,0.2)]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-brand" />
                  <h3 className="font-black text-brand uppercase text-[10px] tracking-[0.3em]">
                    Dispatch Protocol
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-secondary hover:text-primary"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleDispatch} className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-secondary tracking-[0.2em] ml-1">
                    Mission Objective
                  </label>
                  <input
                    autoFocus
                    required
                    placeholder="e.g. Inspect Boiler Turbine #02"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-base border border-white/10 rounded-2xl p-5 text-sm text-primary focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all font-bold placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-secondary tracking-[0.2em] ml-1">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Normal", "High"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`py-4 rounded-2xl text-[10px] font-black uppercase border transition-all duration-300 ${
                          priority === p
                            ? "bg-brand text-base border-brand shadow-lg shadow-brand/20 scale-105"
                            : "bg-white/5 text-secondary border-white/10 hover:border-white/20"
                        }`}
                      >
                        {p} Priority
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand text-base font-black uppercase py-5 rounded-2xl tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl shadow-brand/20 mt-4"
                >
                  Authorize Dispatch
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
