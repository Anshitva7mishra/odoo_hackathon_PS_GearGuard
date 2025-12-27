import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { getEquipment, updateEquipmentStatus } from "../../services/equipmentService";
import { motion } from "framer-motion";
import { Wrench, MapPin, Hash, Calendar, CheckCircle, XCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function EquipmentDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = user?.role?.toLowerCase() || "technician";

  useEffect(() => {
    fetchEquipmentDetail();
  }, [id]);

  const fetchEquipmentDetail = async () => {
    try {
      const data = await getEquipment();
      const item = data.find(eq => eq.id === id);
      setEquipment(item);
    } catch (error) {
      console.error("Error fetching equipment detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await updateEquipmentStatus(id, status);
      setEquipment({ ...equipment, status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "text-success";
      case "Under Maintenance":
        return "text-brand";
      case "Down":
        return "text-red-400";
      default:
        return "text-secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Operational":
        return <CheckCircle size={20} />;
      case "Under Maintenance":
        return <Wrench size={20} />;
      case "Down":
        return <XCircle size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-secondary">Loading equipment details...</div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-secondary">Equipment not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <header className="flex items-center gap-4 border-b border-white/5 pb-6">
        <Link
          to="/equipment"
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={16} className="text-secondary" />
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase">
            {equipment.name}
          </h1>
          <p className="text-[10px] font-mono text-secondary uppercase tracking-widest">
            Equipment Details
          </p>
        </div>
      </header>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary">Current Status</h2>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${getStatusColor(equipment.status)} border-current/20`}>
            {getStatusIcon(equipment.status)}
            <span className="font-bold uppercase text-sm">{equipment.status}</span>
          </div>
        </div>

        {(role === "manager" || role === "admin") && (
          <div className="grid grid-cols-3 gap-3">
            {["Operational", "Under Maintenance", "Down"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                className={`p-3 rounded-xl border transition-all text-center ${
                  equipment.status === status
                    ? "bg-brand text-base border-brand"
                    : "bg-white/5 text-secondary border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="text-[10px] font-bold uppercase mb-1">
                  {status === "Under Maintenance" ? "Maintenance" : status}
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Hash size={18} className="text-brand" />
            Identification
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest mb-1">
                Serial Number
              </p>
              <p className="text-primary font-mono">{equipment.serialNumber}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest mb-1">
                Equipment ID
              </p>
              <p className="text-primary font-mono">{equipment.id}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-brand" />
            Location & Timeline
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest mb-1">
                Location
              </p>
              <p className="text-primary">{equipment.location}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-secondary tracking-widest mb-1">
                Last Updated
              </p>
              <p className="text-primary font-mono">
                {new Date(equipment.updatedAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
