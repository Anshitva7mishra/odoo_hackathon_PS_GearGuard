import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { getEquipment } from "../../services/equipmentService";
import { motion, AnimatePresence } from "framer-motion";
import { Archive, Wrench, MapPin, Hash, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArchivedEquipment() {
  const { user } = useAuthStore();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = user?.role?.toLowerCase() || "technician";

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const data = await getEquipment();
      // Filter for archived equipment (assuming status "Archived" or similar)
      const archived = data.filter(eq => eq.status === "Archived" || eq.status === "Down");
      setEquipment(archived);
    } catch (error) {
      console.error("Error fetching archived equipment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-secondary">Loading archived equipment...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <div className="flex items-center gap-2">
          <Archive size={20} className="text-brand" />
          <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase">
            Archived <span className="text-brand">Equipment</span>
          </h1>
        </div>
        <p className="text-[10px] font-mono text-secondary uppercase tracking-widest">
          Total Archived Units: {equipment.length}
        </p>
      </header>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {equipment.length > 0 ? (
            equipment.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-base border border-white/10 flex items-center justify-center text-secondary">
                      <Wrench size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">
                        {item.name}
                      </h3>
                      <p className="text-[9px] font-mono text-secondary uppercase">
                        #{item.serialNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded border border-red-400/20 text-red-400">
                    <Archive size={12} />
                    <span className="text-[8px] font-bold uppercase">
                      Archived
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-secondary" />
                    <span className="text-sm text-primary">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash size={12} className="text-secondary" />
                    <span className="text-[10px] font-mono text-secondary">{item.id}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to={`/equipment/${item.id}`}
                    className="text-[10px] font-black uppercase text-brand hover:text-brand/80 transition-colors flex items-center gap-1"
                  >
                    <Eye size={12} />
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Archive size={48} className="text-secondary mx-auto mb-4 opacity-30" />
              <p className="text-secondary text-lg font-bold">No archived equipment found</p>
              <p className="text-secondary text-sm">Equipment marked as "Down" or "Archived" will appear here</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
