import express from "express";
import {
  createNewMedicalRecord,
  deleteMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordDetail,
  updateMedicalRecord,
} from "../controllers/medicalRecordController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewMedicalRecord);

router.put("/update/:id", verifySpecificRole, updateMedicalRecord);

router.delete("/delete/:id", verifySpecificRole, deleteMedicalRecord);

router.get("/get-all", getAllMedicalRecords);

router.get("/:id", getMedicalRecordDetail);

export default router;
