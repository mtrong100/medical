import express from "express";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";
import {
  createNewAppointment,
  deleteAppointment,
  getAllAppointment,
  getAppointmentDetail,
  updateAppointment,
  bookingNewAppointment,
  getCollection,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/collection", verifySpecificRole, getCollection);

router.post("/create", createNewAppointment);

router.post("/booking", bookingNewAppointment);

router.put("/update/:id", verifySpecificRole, updateAppointment);

router.delete("/delete/:id", verifySpecificRole, deleteAppointment);

router.get("/get-all", getAllAppointment);

router.get("/:id", getAppointmentDetail);

export default router;
