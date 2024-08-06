import express from "express";
import {
  createPrescription,
  deletePrescription,
  getPrescriptions,
  getPrescriptionDetail,
  getPrescriptionCollection,
  getPrescriptionStats,
} from "../controllers/prescriptionController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { validateCreatePrescription } from "../validation/prescriptionValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getPrescriptionCollection);

router.get("/", verifyAdmin, getPrescriptions);

router.get("/stats", getPrescriptionStats);

router.get("/:id", verifyAdmin, getPrescriptionDetail);

router.post(
  "/create",
  verifyAdmin,
  validateCreatePrescription,
  createPrescription
);

router.delete("/delete/:id", verifyAdmin, deletePrescription);

export default router;
