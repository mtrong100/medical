import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointmentDetail,
  updateAppointment,
  bookingAppointment,
  getAppoinmentCollection,
  getAppointmentStats,
} from "../controllers/appointmentController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateBookingAppointment,
  validateCreateAppointment,
  validateUpdateAppointment,
} from "../validation/appointmentsValidate.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getAppoinmentCollection);

router.get("/", verifyAdmin, getAppointments);

router.get("/stats", getAppointmentStats);

router.get("/:id", verifyAdmin, getAppointmentDetail);

router.post(
  "/create",
  verifyAdmin,
  validateCreateAppointment,
  createAppointment
);

router.post(
  "/booking",
  verifyUser,
  validateBookingAppointment,
  bookingAppointment
);

router.put(
  "/update/:id",
  verifyAdmin,
  validateUpdateAppointment,
  updateAppointment
);

router.delete("/delete/:id", verifyAdmin, deleteAppointment);

export default router;
