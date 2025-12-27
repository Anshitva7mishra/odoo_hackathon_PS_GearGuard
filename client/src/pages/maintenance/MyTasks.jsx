import { useGearGuardStore } from "../../store/useGearGuardStore";
import { Target, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function MyTasks() {
  const { tasks } = useGearGuardStore();
  const activeTasks = tasks.filter((t) => t.status !== "completed");

  return (
    <section className="space-y-4 pt-8 border-t border-white/5">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-brand animate-pulse" />
          <h2 className="text-xs font-black uppercase tracking-widest text-primary italic">
            Live Task Stream
          </h2>
        </div>
        <span className="text-[9px] font-mono text-secondary px-2 py-1 bg-white/5 rounded border border-white/5 uppercase">
          {activeTasks.length} Pending
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {activeTasks.map((task, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={task.id}
            className="bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 md:p-5 flex items-center justify-between group hover:border-brand/40 transition-all shadow-xl"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-base border border-white/10 flex items-center justify-center text-brand shrink-0 group-hover:rotate-12 transition-transform">
                <Target size={20} />
              </div>
              <div className="truncate">
                <p className="font-bold text-primary truncate leading-tight md:text-base">
                  {task.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-secondary font-mono">
                    #{task.id}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <Clock size={10} className="text-secondary" />
                  <span className="text-[9px] text-secondary font-bold italic">
                    {task.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[8px] font-black px-2 py-1 rounded border uppercase ${
                  task.priority === "High"
                    ? "border-red-500/30 text-red-400"
                    : "border-brand/30 text-brand"
                }`}
              >
                {task.priority}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
