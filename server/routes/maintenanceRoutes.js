import express from "express";
import {
  createLog,
  getLogsByMachine,
} from "../controllers/maintenanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, createLog);


router.get("/:equipmentId", protect, getLogsByMachine);

export default router;
