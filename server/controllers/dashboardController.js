import Equipment from "../models/Equipment.js";
import Maintenance from "../models/Maintenance.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalEquipment = await Equipment.count();

    const activeMaintenance = await Maintenance.count({
      where: {
        status: ["Pending", "In Progress"],
      },
    });

    const totalTechnicians = await User.count({
      where: { role: "Technician" },
    });

    const operationalMachines = await Equipment.count({
      where: { status: "Operational" },
    });

    res.json({
      totalEquipment,
      activeMaintenance,
      totalTechnicians,
      operationalMachines,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      message: "Server Error: Could not fetch dashboard statistics",
    });
  }
};
