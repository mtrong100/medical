import express from "express";
import {
  createNewMedicine,
  deleteMedicine,
  getAllMedicine,
  getMedicineCollection,
  updateMedicine,
} from "../controllers/medicineController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewMedicine);

router.put("/update/:id", verifySpecificRole, updateMedicine);

router.delete("/delete/:id", verifySpecificRole, deleteMedicine);

router.get("/get-all", getAllMedicine);

router.get("/get-collection", getMedicineCollection);

export default router;
