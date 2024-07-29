import express from "express";
import {
  createMedicalServiceInvoice,
  deleteMedicalServiceInvoice,
  getMedicalServiceInvoices,
  getMedicalServiceInvoiceDetail,
  getMedicalServiceInvoiceCollection,
  updateMedicalServiceInvoice,
} from "../controllers/medicalServiceInvoiceController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateCreateMedicalServiceInvoice,
  validateUpdateMedicalServiceInvoice,
} from "../validation/medicalServiceInvoiceValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getMedicalServiceInvoiceCollection);

router.get("/", verifyAdmin, getMedicalServiceInvoices);

router.get("/:id", verifyAdmin, getMedicalServiceInvoiceDetail);

router.post(
  "/create",
  verifyAdmin,
  validateCreateMedicalServiceInvoice,
  createMedicalServiceInvoice
);

router.put(
  "/update/:id",
  verifyAdmin,
  validateUpdateMedicalServiceInvoice,
  updateMedicalServiceInvoice
);

router.delete("/delete/:id", verifyAdmin, deleteMedicalServiceInvoice);

export default router;
