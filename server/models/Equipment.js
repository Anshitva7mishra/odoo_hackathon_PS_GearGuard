import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Equipment = sequelize.define("Equipment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Operational", "Under Maintenance", "Down"),
    defaultValue: "Operational",
  },
});

export default Equipment;
