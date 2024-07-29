import express from "express";
import {
  createMedicalService,
  deleteMedicalService,
  getMedicalServices,
  updateMedicalService,
} from "../controllers/medicalServiceController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateCreateMedicalService,
  validateUpdateMedicalService,
} from "../validation/medicalSeviceValidate.js";

const router = express.Router();

router.get("/", verifyAdmin, getMedicalServices);

router.post(
  "/create",
  verifyAdmin,
  validateCreateMedicalService,
  createMedicalService
);

router.put(
  "/update/:id",
  verifyAdmin,
  validateUpdateMedicalService,
  updateMedicalService
);

router.delete("/delete/:id", verifyAdmin, deleteMedicalService);

export default router;
