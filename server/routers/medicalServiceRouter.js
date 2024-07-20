import express from "express";
import {
  createMedicalService,
  deleteMedicalService,
  getMedicalServices,
  updateMedicalService,
} from "../controllers/medicalServiceController.js";

const router = express.Router();

router.get("/medical-services", getMedicalServices);

router.post("/create", createMedicalService);

router.put("/update/:id", updateMedicalService);

router.delete("/delete/:id", deleteMedicalService);

export default router;
