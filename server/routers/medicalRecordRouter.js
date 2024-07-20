import express from "express";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecords,
  getMedicalRecordDetail,
  updateMedicalRecord,
} from "../controllers/medicalRecordController.js";

const router = express.Router();

router.get("/medical-records", getMedicalRecords);

router.get("/:id", getMedicalRecordDetail);

router.post("/create", createMedicalRecord);

router.put("/update/:id", updateMedicalRecord);

router.delete("/delete/:id", deleteMedicalRecord);

export default router;
