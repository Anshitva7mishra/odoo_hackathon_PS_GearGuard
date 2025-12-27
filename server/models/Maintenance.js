import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
    },

    technicianId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    equipmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Maintenance;
