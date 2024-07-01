import express from "express";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";
import {
  createNewInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceDetail,
  updateInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewInvoice);

router.put("/update/:id", verifySpecificRole, updateInvoice);

router.delete("/delete/:id", verifySpecificRole, deleteInvoice);

router.get("/get-all", verifySpecificRole, getAllInvoices);

router.get("/:id", verifySpecificRole, getInvoiceDetail);

export default router;
