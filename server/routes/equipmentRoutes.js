import express from "express";
import {
  getEquipment,
  addEquipment,
  updateEquipmentStatus,
} from "../controllers/equipmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", protect, getEquipment);


router.post("/", protect, admin, addEquipment);


router.put("/:id", protect, updateEquipmentStatus);

export default router;
