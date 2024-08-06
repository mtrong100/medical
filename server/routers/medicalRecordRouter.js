import express from "express";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecords,
  getMedicalRecordDetail,
  updateMedicalRecord,
  getMedicalRecordStats,
} from "../controllers/medicalRecordController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateCreateMedicalRecord,
  validateUpdateMedicalRecord,
} from "../validation/medicalRecordValidate.js";

const router = express.Router();

router.get("/", verifyAdmin, getMedicalRecords);

router.get("/stats", getMedicalRecordStats);

router.get("/:id", verifyAdmin, getMedicalRecordDetail);

router.post(
  "/create",
  verifyAdmin,
  validateCreateMedicalRecord,
  createMedicalRecord
);

router.put(
  "/update/:id",
  verifyAdmin,
  validateUpdateMedicalRecord,
  updateMedicalRecord
);

router.delete("/delete/:id", verifyAdmin, deleteMedicalRecord);

export default router;
