import MaintenanceTeam from "../models/MaintenanceTeam.js";
import User from "../models/User.js";
import Equipment from "../models/Equipment.js";


export const createTeam = async (req, res) => {
  const { name, description } = req.body;

  try {
    const team = await MaintenanceTeam.create({ name, description });
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getTeams = async (req, res) => {
  const teams = await MaintenanceTeam.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "role"],
      },
      {
        model: Equipment,
        attributes: ["id", "name", "status"],
      },
    ],
  });

  res.json(teams);
};

export const assignUserToTeam = async (req, res) => {
  const { userId, teamId } = req.body;

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.teamId = teamId;
  await user.save();

  res.json({ message: "User assigned to team successfully" });
};

export const assignEquipmentToTeam = async (req, res) => {
  const { equipmentId, teamId } = req.body;

  const equipment = await Equipment.findByPk(equipmentId);
  if (!equipment) {
    return res.status(404).json({ message: "Equipment not found" });
  }

  equipment.teamId = teamId;
  await equipment.save();

  res.json({ message: "Equipment assigned to team successfully" });
};
