import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Maintenance = sequelize.define("Maintenance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "New Maintenance Task",
  },
  status: {
    type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
    defaultValue: "Pending",
  },
  
});


export default Maintenance;
