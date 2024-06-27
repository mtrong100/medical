import express from "express";
import {
  createNewMedicineCategory,
  deleteMedicineCategory,
  getAllMedicineCategory,
  updateMedicineCategory,
} from "../controllers/medicineCategoryController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewMedicineCategory);

router.put("/update/:id", verifySpecificRole, updateMedicineCategory);

router.delete("/delete/:id", verifySpecificRole, deleteMedicineCategory);

router.get("/get-all", getAllMedicineCategory);

export default router;
