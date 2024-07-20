import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentDetail,
  updateAppointment,
  bookingAppointment,
  getCollection,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/appointments", getAppointments);

router.get("/:id", getAppointmentDetail);

router.post("/create", createAppointment);

router.post("/booking", bookingAppointment);

router.put("/update/:id", updateAppointment);

router.delete("/delete/:id", deleteAppointment);

export default router;
