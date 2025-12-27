import { useAuthStore } from "../../store/authStore";
import { useGearGuardStore } from "../../store/useGearGuardStore";
import {
  Trash2,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrapQueue() {
  const { user } = useAuthStore();
  const { scrapItems, approveScrap } = useGearGuardStore();
  if (!user?.role) {
    return null; // or loading / redirect
  }
  const role = user.role.toLowerCase();
  if (!["manager", "admin"].includes(role)) {
    return (
      <div className="text-center text-red-400 font-bold">
        Unauthorized Access
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* HEADER */}
      <header className="space-y-1 border-l-4 border-red-500 pl-4 bg-linear-to-r from-red-500/5 to-transparent py-3">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert size={14} className="text-red-500 animate-pulse" />
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">
            Compliance Node
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase italic leading-none">
          SCRAP <span className="text-white/20">QUEUE</span>
        </h1>
      </header>

      {/* SCRAP LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {scrapItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id}
              className="bg-surface/50 border border-red-500/10 p-6 rounded-4xl relative overflow-hidden group shadow-2xl backdrop-blur-md"
            >
              {/* Background Icon Decoration */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Trash2 size={80} className="text-red-500" />
              </div>

              <div className="relative z-10 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-secondary px-2 py-1 bg-white/5 rounded border border-white/5">
                    REF: #{item.id}
                  </span>
                  <AlertTriangle size={16} className="text-red-500" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-primary tracking-tight leading-none group-hover:text-red-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-secondary italic mt-2 font-medium">
                    " {item.reason} "
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-secondary">
                    <span>Requester:</span>
                    <span className="text-brand italic">{item.requester}</span>
                  </div>

                  <button
                    onClick={() => approveScrap(item.id)}
                    className="w-full bg-success text-base font-black uppercase text-[10px] py-3.5 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-success/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={14} /> Authorize Disposal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {scrapItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] space-y-4"
          >
            <Activity size={48} className="mx-auto text-white/5" />
            <p className="text-secondary uppercase tracking-[0.5em] text-[10px] font-black opacity-30">
              Inventory Stream Clear • No Pending Scrap
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
