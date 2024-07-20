import express from "express";
import {
  createMedicineCategory,
  deleteMedicineCategory,
  getCollection,
  getMedicineCategories,
  updateMedicineCategory,
} from "../controllers/medicineCategoryController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/medicine-categories", getMedicineCategories);

router.post("/create", createMedicineCategory);

router.put("/update/:id", updateMedicineCategory);

router.delete("/delete/:id", deleteMedicineCategory);

export default router;
