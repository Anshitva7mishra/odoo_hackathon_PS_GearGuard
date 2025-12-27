import Maintenance from "../models/Maintenance.js";
import Equipment from "../models/Equipment.js";
import User from "../models/User.js";

export const createLog = async (req, res) => {
  const { equipmentId, type, description, hoursSpent, status } = req.body;

  try {
    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const log = await Maintenance.create({
      equipmentId,
      technicianId: req.user.id,
      teamId: equipment.teamId,
      type,
      description,
      hoursSpent,
      status,
    });

    if (status === "Scrap") {
      equipment.status = "Down";
      await equipment.save();
    }

    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLogsByMachine = async (req, res) => {
  const logs = await Maintenance.findAll({
    where: { equipmentId: req.params.equipmentId },
    include: [
      {
        model: User,
        as: "technician",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.json(logs);
};
