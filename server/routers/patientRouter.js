import express from "express";
import {
  createPatient,
  deletePatient,
  getPatients,
  getPatientDetail,
  updatePatient,
  getMedicalRecordsFromPatient,
  getAppointmentsFromPatient,
  getCollection,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/patients", getPatients);

router.get("/:id", getPatientDetail);

router.get("/medical-records/:id", getMedicalRecordsFromPatient);

router.get("/appointments/:id", getAppointmentsFromPatient);

router.post("/create", createPatient);

router.put("/update/:id", updatePatient);

router.delete("/delete/:id", deletePatient);

export default router;
