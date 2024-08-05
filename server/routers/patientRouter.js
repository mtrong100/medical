import express from "express";
import {
  createPatient,
  deletePatient,
  getPatients,
  getPatientDetail,
  updatePatient,
  getMedicalRecordsFromPatient,
  getAppointmentsFromPatient,
  getPatientCollection,
  getPatientStats,
} from "../controllers/patientController.js";
import { validatePatientData } from "../validation/patientValidate.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getPatientCollection);

router.get("/", verifyAdmin, getPatients);

router.get("/stats", verifyAdmin, getPatientStats);

router.get("/:id", verifyUser, getPatientDetail);

router.get("/medical-records/:id", verifyUser, getMedicalRecordsFromPatient);

router.get("/appointments/:id", verifyUser, getAppointmentsFromPatient);

router.post("/create", verifyAdmin, validatePatientData, createPatient);

router.put("/update/:id", verifyAdmin, validatePatientData, updatePatient);

router.delete("/delete/:id", verifyAdmin, deletePatient);

export default router;
