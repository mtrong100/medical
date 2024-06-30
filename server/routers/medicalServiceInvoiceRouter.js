import express from "express";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";
import {
  createNewMedicalServiceInvoice,
  deleteMedicalServiceInvoice,
  getAllMedicalServiceInvoice,
  getMedicalServiceInvoiceDetail,
  updateMedicalServiceInvoice,
} from "../controllers/medicalServiceInvoiceController.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewMedicalServiceInvoice);

router.put("/update/:id", verifySpecificRole, updateMedicalServiceInvoice);

router.delete("/delete/:id", verifySpecificRole, deleteMedicalServiceInvoice);

router.get("/get-all", getAllMedicalServiceInvoice);

router.get("/:id", getMedicalServiceInvoiceDetail);

export default router;
