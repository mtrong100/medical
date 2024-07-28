import express from "express";
import {
  createMedicineCategory,
  deleteMedicineCategory,
  getMedicineCategoryCollection,
  getMedicineCategories,
  updateMedicineCategory,
} from "../controllers/medicineCategoryController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { validateMedicineCategoryData } from "../validation/medicineCategoryValidate.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getMedicineCategoryCollection);

router.get("/", verifyAdmin, getMedicineCategories);

router.post(
  "/create",
  verifyAdmin,
  validateMedicineCategoryData,
  createMedicineCategory
);

router.put(
  "/update/:id",
  verifyAdmin,
  validateMedicineCategoryData,
  updateMedicineCategory
);

router.delete("/delete/:id", verifyAdmin, deleteMedicineCategory);

export default router;
