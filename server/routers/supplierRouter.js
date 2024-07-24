import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplierCollection,
  getSupplierDetail,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/collection", getSupplierCollection);
router.get("/suppliers", getSuppliers);
router.get("/:id", getSupplierDetail);
router.post("/create", createSupplier);
router.put("/update/:id", updateSupplier);
router.delete("/delete/:id", deleteSupplier);

export default router;
