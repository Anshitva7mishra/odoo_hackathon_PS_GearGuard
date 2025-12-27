import express from "express";
import {
  createTeam,
  getTeams,
  assignUserToTeam,
  assignEquipmentToTeam,
} from "../controllers/teamController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, admin, createTeam);
router.get("/", protect, admin, getTeams);
router.put("/assign-user", protect, admin, assignUserToTeam);
router.put("/assign-equipment", protect, admin, assignEquipmentToTeam);

export default router;
