import express from "express";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";
import {
  createNewAppointment,
  deleteAppointment,
  getAllAppointment,
  getAppointmentDetail,
  updateAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/create", createNewAppointment);

router.put("/update/:id", verifySpecificRole, updateAppointment);

router.delete("/delete/:id", verifySpecificRole, deleteAppointment);

router.get("/get-all", getAllAppointment);

router.get("/:id", getAppointmentDetail);

export default router;
