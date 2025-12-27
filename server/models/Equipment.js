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

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM("Operational", "Under Maintenance", "Down"),
      defaultValue: "Operational",
    },
  },
  {
    tableName: "Equipment",
    timestamps: true,
  }
);

export default Equipment;
