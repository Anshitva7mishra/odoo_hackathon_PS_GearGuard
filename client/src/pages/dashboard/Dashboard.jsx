import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "../../store/authStore";
import {
  ClipboardList,
  AlertTriangle,
  Clock,
  Users,
  Wrench,
  ShieldCheck,
  Play,
  Activity,
  Plus,
  FileText,
  Settings,
  ArrowUpRight,
  X,
  Download,
  CheckCircle2,
  Target,
  Cpu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= 1. PERSISTED DATA STORE ================= 
   State management with local storage persistence.
============================================================ */
const useDashboardData = create(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: "GG-1024",
          name: "Turbine Blade Inspection",
          priority: "High",
          status: "Pending",
          time: "10:30 AM",
        },
      ],
      addTask: (newTask) =>
        set((state) => ({
          tasks: [
            {
              ...newTask,
              id: `GG-${Math.floor(Math.random() * 9000) + 1000}`,
              status: "Pending",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            ...state.tasks,
          ],
        })),
      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      exportLogs: (role) => {
        const content = `GEARGUARD LOG\nROLE: ${role}\nTIME: ${new Date().toISOString()}\nTASKS: ${JSON.stringify(
          get().tasks,
          null,
          2
        )}`;
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `GearGuard_${role}_Report.txt`;
        link.click();
      },
    }),
    { name: "gearguard-v3-storage" }
  )
);

/* ================= 2. RESPONSIVE COMPONENTS ================= */

const StatCard = ({ title, value, icon: Icon, color = "text-brand" }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative group bg-surface/40 backdrop-blur-md border border-white/5 rounded-xl p-4 md:p-6 overflow-hidden transition-all"
  >
    <div
      className={`absolute -right-4 -top-4 w-20 h-20 blur-[50px] opacity-10 rounded-full bg-current ${color}`}
    />
    <div className="flex justify-between items-center relative z-10">
      <div
        className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${color}`}
      >
        <Icon size={20} />
      </div>
      <div className="text-right">
        <p className="text-[9px] md:text-[10px] font-black text-secondary uppercase tracking-widest">
          {title}
        </p>
        <p className="text-xl md:text-3xl font-black text-primary tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

/* ================= 3. MAIN DASHBOARD ================= */

export default function Dashboard() {

  const { user } = useAuthStore();
  const { tasks, addTask, completeTask, exportLogs } = useDashboardData();

  // URL check logic removed. Strictly uses store.
  const role = user?.role?.toLowerCase() || "technician";


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Normal");

  const handleDispatch = (e) => {
    e.preventDefault();
    if (!taskName) return;
    addTask({ name: taskName, priority: taskPriority });
    setTaskName("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen space-y-6 md:space-y-10 max-w-7xl mx-auto px-4 py-6 md:p-8 animate-in fade-in duration-700">
      {/* --- RESPONSIVE HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-secondary">
              Core Status: <span className="text-brand">Online</span>
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase">
            {role} <span className="text-brand">Hub</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl w-fit">
          <div className="text-left md:text-right">
            <p className="text-[9px] text-secondary font-mono uppercase">
              Terminal Time
            </p>
            <p className="text-xs font-bold text-primary">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </header>

      {/* --- RESPONSIVE STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Active Queue"
          value={tasks.length}
          icon={Cpu}
          color="text-brand"
        />
        <StatCard
          title="Priority Alert"
          value={tasks.filter((t) => t.priority === "High").length}
          icon={AlertTriangle}
          color="text-red-400"
        />
        <StatCard
          title="Fleet Units"
          value="1,248"
          icon={Wrench}
          color="text-success"
        />
        <StatCard
          title="Logged Users"
          value="42"
          icon={Users}
          color="text-brand"
        />
      </div>

      {/* --- MAIN INTERFACE (STAX ON MOBILE) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* TASK QUEUE CONTAINER */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-surface/30 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 md:p-6 border-b border-white/5 bg-white/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-brand" />
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary">
                  Mission Feed
                </h3>
              </div>
              <span className="text-[9px] font-mono text-secondary px-2 py-1 bg-white/5 rounded-md">
                {tasks.length} SYNCED
              </span>
            </div>

            <div className="p-4 md:p-6">
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {tasks.length > 0 ? (
                    tasks.map((task, idx) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                        key={task.id}
                        className="flex items-center justify-between p-3 md:p-4 bg-base/50 rounded-xl border border-white/5 hover:border-brand/40 transition-all group"
                      >
                        <div className="flex items-center gap-3 md:gap-5 min-w-0">
                          <div
                            className={`w-1 md:w-1.5 h-8 md:h-10 rounded-full shrink-0 ${
                              task.priority === "High"
                                ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                                : "bg-brand"
                            }`}
                          />
                          <div className="truncate">
                            <p className="text-xs md:text-sm font-bold text-primary truncate group-hover:text-brand transition-colors">
                              {task.name}
                            </p>
                            <p className="text-[9px] text-secondary font-mono tracking-tighter uppercase mt-0.5 truncate">
                              #{task.id} • {task.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {role === "technician" && (
                            <button
                              onClick={() => completeTask(task.id)}
                              className="p-2 rounded-lg bg-success/10 text-success border border-success/20 hover:bg-success hover:text-base transition-all"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-secondary text-[10px] font-black uppercase tracking-widest opacity-30 italic">
                        All Systems Clear
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* COMMAND SIDEBAR */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6">
          <div className="bg-surface/50 border border-white/5 rounded-2xl md:rounded-3xl p-6 shadow-2xl">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
              <Settings size={12} className="text-brand" /> Operational Control
            </h3>

            <div className="space-y-3">
              {role === "manager" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-brand text-[11px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-brand/20"
                >
                  <Plus size={16} /> New Dispatch
                </button>
              )}

              <button
                onClick={() => exportLogs(role)}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-primary font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <Download size={16} className="text-secondary" /> Download
                Report
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl md:rounded-3xl border border-brand/20 bg-linear-to-br from-brand/5 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-brand" />
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                Global Feed
              </span>
            </div>
            <p className="text-[10px] text-secondary leading-relaxed font-medium">
              Fleet operations are currently operating at peak efficiency. No
              hardware anomalies detected in the last cycle.
            </p>
          </div>
        </div>
      </div>

      {/* --- MOBILE-OPTIMIZED MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-base/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface border border-white/10 rounded-2xl md:rounded-4xl w-full max-w-md overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/2">
                <h3 className="font-black text-brand uppercase text-[10px] tracking-widest">
                  New Mission
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-secondary hover:text-primary"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleDispatch} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-secondary tracking-widest">
                    Description
                  </label>
                  <input
                    autoFocus
                    required
                    placeholder="Task detail..."
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full bg-base border border-white/10 rounded-xl p-4 text-sm text-primary focus:border-brand outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-secondary tracking-widest">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {["Normal", "High"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setTaskPriority(p)}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${
                          taskPriority === p
                            ? "bg-brand text-base border-brand"
                            : "bg-white/5 text-secondary border-white/5"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand text-base font-black uppercase py-4 rounded-xl tracking-widest hover:brightness-110 active:scale-95 transition-all"
                >
                  Dispatch Task
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
