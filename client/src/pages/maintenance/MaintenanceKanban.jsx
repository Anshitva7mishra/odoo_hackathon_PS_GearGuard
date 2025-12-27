import { useAuthStore } from "../../store/authStore";
import { useGearGuardStore } from "../../store/useGearGuardStore";
import MyTasks from "./MyTasks";
import { motion } from "framer-motion";
import { Play, CheckCircle2, LayoutDashboard, Settings2 } from "lucide-react";

export default function MaintenanceKanban() {
  const { user } = useAuthStore();
  const { tasks, updateTaskStatus } = useGearGuardStore();
  if (!user?.role) {
    return null; // or loading / redirect
  }

  const role = user.role.toLowerCase();
  if (role !== "technician") {
    return (
      <div className="text-center text-red-400 font-bold">
        Unauthorized Access
      </div>
    );
  }

  const columns = ["todo", "in-progress", "completed"];

  return (
    <div className="space-y-8 p-4 md:p-8 animate-in fade-in duration-700 max-w-7xl mx-auto overflow-x-hidden">
      {/* HEADER */}
      <header className="flex flex-col gap-2 border-l-4 border-brand pl-4 bg-linear-to-r from-brand/5 to-transparent py-2">
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase italic leading-none">
          TECH <span className="text-brand">WORKSPACE</span>
        </h1>
        <div className="flex items-center gap-2">
          <Settings2 size={12} className="text-secondary" />
          <p className="text-[10px] font-mono text-secondary uppercase tracking-widest italic">
            Operational Access: {role}
          </p>
        </div>
      </header>

      {/* --- KANBAN SECTION --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <LayoutDashboard size={14} className="text-brand" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
            Workflow Management
          </h2>
        </div>

        {/* Horizontal scroll on mobile 320px */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3">
          {columns.map((col) => (
            <div
              key={col}
              className="min-w-70 md:min-w-full bg-surface/30 rounded-3xl border border-white/5 p-4 flex flex-col gap-4 shadow-2xl backdrop-blur-sm"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary flex items-center gap-2 border-b border-white/5 pb-3">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    col === "in-progress"
                      ? "bg-brand animate-pulse"
                      : col === "completed"
                      ? "bg-success"
                      : "bg-white/20"
                  }`}
                />
                {col}
              </h3>

              <div className="space-y-3 min-h-25">
                {tasks
                  .filter((t) => t.status === col)
                  .map((task) => (
                    <motion.div
                      layout
                      key={task.id}
                      className="bg-base/50 border border-white/10 rounded-2xl p-4 space-y-4 hover:border-brand/30 transition-all shadow-inner"
                    >
                      <p className="text-sm font-bold text-primary leading-snug tracking-tight">
                        {task.name}
                      </p>
                      {col !== "completed" && (
                        <button
                          onClick={() =>
                            updateTaskStatus(
                              task.id,
                              col === "todo" ? "in-progress" : "completed"
                            )
                          }
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                            col === "todo"
                              ? "bg-brand/10 text-brand border border-brand/20 hover:bg-brand hover:text-base"
                              : "bg-success/10 text-success border border-success/20 hover:bg-success hover:text-base"
                          }`}
                        >
                          {col === "todo" ? (
                            <Play size={12} />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}
                          Move to {col === "todo" ? "Progress" : "Done"}
                        </button>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INTEGRATED LIST COMPONENT --- */}
      <MyTasks />
    </div>
  );
}
