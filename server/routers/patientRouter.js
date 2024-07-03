import express from "express";
import {
  createNewPatient,
  deletePatient,
  getAllPatients,
  getPatientDetail,
  patientLogin,
  updatePatient,
} from "../controllers/patientController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewPatient);

router.post("/login",  patientLogin);

router.put("/update/:id", updatePatient);

router.delete("/delete/:id", verifySpecificRole, deletePatient);

router.get("/get-all", getAllPatients);

router.get("/:id", getPatientDetail);

export default router;
