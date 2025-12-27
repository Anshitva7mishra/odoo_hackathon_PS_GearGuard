import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import MaintenanceTeam from "./MaintenanceTeam.js";

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

    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "Equipment",
    timestamps: true,
  }
);


Equipment.belongsTo(MaintenanceTeam, { foreignKey: "teamId" });
MaintenanceTeam.hasMany(Equipment, { foreignKey: "teamId" });

export default Equipment;
