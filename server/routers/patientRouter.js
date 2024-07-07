import express from "express";
import {
  createNewPatient,
  deletePatient,
  getAllPatients,
  getPatientDetail,
  patientLogin,
  updatePatient,
  getMedicalRecordsFromPatient,
  getAppointmentsFromPatient,
  getCollection,
} from "../controllers/patientController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.get("/collection", verifySpecificRole, getCollection);

router.post("/create", verifySpecificRole, createNewPatient);

router.post("/login", patientLogin);

router.put("/update/:id", updatePatient);

router.delete("/delete/:id", verifySpecificRole, deletePatient);

router.get("/get-all", getAllPatients);

router.get("/:id", getPatientDetail);

router.get("/medical-records/:id", getMedicalRecordsFromPatient);

router.get("/appointments/:id", getAppointmentsFromPatient);

export default router;
