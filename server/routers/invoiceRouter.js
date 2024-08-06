import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getInvoiceDetail,
  updateInvoice,
  getInvoiceCollection,
  getInvoiceStats,
} from "../controllers/invoiceController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateCreateInvoice,
  validateUpdateInvoice,
} from "../validation/invoiceValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getInvoiceCollection);

router.get("/", verifyAdmin, getInvoices);

router.get("/stats", getInvoiceStats);

router.get("/:id", verifyAdmin, getInvoiceDetail);

router.post("/create", verifyAdmin, validateCreateInvoice, createInvoice);

router.put("/update/:id", verifyAdmin, validateUpdateInvoice, updateInvoice);

router.delete("/delete/:id", verifyAdmin, deleteInvoice);

export default router;
