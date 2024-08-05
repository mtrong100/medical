import express from "express";
import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  getMedicineCollection,
  updateMedicine,
  getMedicineDetail,
  getMedicineStats,
} from "../controllers/medicineController.js";
import {
  validateCreateMedicine,
  validateUpdateMedicine,
} from "../validation/medicineValidate.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getMedicineCollection);

router.get("/", verifyAdmin, getMedicines);

router.get("/stats", verifyAdmin, getMedicineStats);

router.get("/:id", verifyAdmin, getMedicineDetail);

router.post("/create", verifyAdmin, validateCreateMedicine, createMedicine);

router.put("/update/:id", verifyAdmin, validateUpdateMedicine, updateMedicine);

router.delete("/delete/:id", verifyAdmin, deleteMedicine);

export default router;
