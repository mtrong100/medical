import express from "express";
import {
  createMedicalServiceInvoice,
  deleteMedicalServiceInvoice,
  getMedicalServiceInvoices,
  getMedicalServiceInvoiceDetail,
  updateMedicalServiceInvoice,
  getCollection,
} from "../controllers/medicalServiceInvoiceController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/medical-service-invoices", getMedicalServiceInvoices);

router.get("/:id", getMedicalServiceInvoiceDetail);

router.post("/create", createMedicalServiceInvoice);

router.put("/update/:id", updateMedicalServiceInvoice);

router.delete("/delete/:id", deleteMedicalServiceInvoice);

export default router;
