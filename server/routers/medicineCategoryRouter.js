import express from "express";
import {
  createNewMedicineCategory,
  deleteMedicineCategory,
  getAllMedicineCategory,
  updateMedicineCategory,
} from "../controllers/medicineCategoryController.js";

const router = express.Router();

router.post("/create", createNewMedicineCategory);

router.put("/update/:id", updateMedicineCategory);

router.delete("/delete/:id", deleteMedicineCategory);

router.get("/get-all", getAllMedicineCategory);

export default router;
