import express from "express";
import {
  createNewMedicalRecord,
  deleteMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordDetail,
  updateMedicalRecord,
} from "../controllers/medicalRecordController.js";

const router = express.Router();

router.post("/create", createNewMedicalRecord);

router.put("/update/:id", updateMedicalRecord);

router.delete("/delete/:id", deleteMedicalRecord);

router.get("/get-all", getAllMedicalRecords);

router.get("/:id", getMedicalRecordDetail);

export default router;
