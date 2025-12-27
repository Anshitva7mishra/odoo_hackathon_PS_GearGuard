import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize, { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import User from "./models/User.js";
import Equipment from "./models/Equipment.js";
import Maintenance from "./models/Maintenance.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

Maintenance.belongsTo(User, { foreignKey: "technicianId", as: "technician" });
Maintenance.belongsTo(Equipment, {
  foreignKey: "equipmentId",
  as: "equipment",
});
User.hasMany(Maintenance, { foreignKey: "technicianId" });
Equipment.hasMany(Maintenance, { foreignKey: "equipmentId" });

app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await sequelize.sync({ alter: true });
    console.log("✅ Database Tables Synced Successfully");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
