import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Equipment from "./Equipment.js";

const Maintenance = sequelize.define(
  "Maintenance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    equipmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Equipment,
        key: "id",
      },
    },
    technicianId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("Preventive", "Repair", "Emergency"),
      defaultValue: "Preventive",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hoursSpent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Completed",
    },
  },
  {
    timestamps: true,
  }
);

export default Maintenance;
