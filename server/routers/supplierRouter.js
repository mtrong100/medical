import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplierCollection,
  getSupplierDetail,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplierController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  validateSupplierData,
  validateUpdateSupplierData,
} from "../validation/supplierValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getSupplierCollection);

router.get("/", verifyAdmin, getSuppliers);

router.get("/:id", verifyAdmin, getSupplierDetail);

router.post("/create", validateSupplierData, verifyAdmin, createSupplier);

router.put(
  "/update/:id",
  validateUpdateSupplierData,
  verifyAdmin,
  updateSupplier
);

router.delete("/delete/:id", verifyAdmin, deleteSupplier);

export default router;
