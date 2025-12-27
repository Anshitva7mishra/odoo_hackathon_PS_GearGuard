import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Equipment from "./Equipment.js";
import MaintenanceTeam from "./MaintenanceTeam.js";

const Maintenance = sequelize.define(
  "Maintenance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM("Inspection", "Repair", "Replacement"),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    hoursSpent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("New", "In Progress", "Completed", "Scrap"),
      defaultValue: "New",
    },

    technicianId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    equipmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);


Maintenance.belongsTo(User, {
  foreignKey: "technicianId",
  as: "technician",
});

Maintenance.belongsTo(Equipment, {
  foreignKey: "equipmentId",
});

Maintenance.belongsTo(MaintenanceTeam, {
  foreignKey: "teamId",
});

MaintenanceTeam.hasMany(Maintenance, { foreignKey: "teamId" });

export default Maintenance;
