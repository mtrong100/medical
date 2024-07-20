import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getInvoiceDetail,
  updateInvoice,
  getCollection,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/invoices", getInvoices);

router.get("/:id", getInvoiceDetail);

router.post("/create", createInvoice);

router.put("/update/:id", updateInvoice);

router.delete("/delete/:id", deleteInvoice);

export default router;
