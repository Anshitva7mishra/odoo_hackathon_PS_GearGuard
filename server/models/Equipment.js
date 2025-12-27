import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Equipment = sequelize.define(
  "Equipment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Operational", "Down", "Maintenance"),
      defaultValue: "Operational",
    },
    lastMaintenance: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

export default Equipment;
