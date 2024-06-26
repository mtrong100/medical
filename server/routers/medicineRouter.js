import express from "express";
import {
  createNewMedicine,
  deleteMedicine,
  getAllMedicine,
  updateMedicine,
} from "../controllers/medicineController.js";

const router = express.Router();

router.post("/create", createNewMedicine);

router.put("/update/:id", updateMedicine);

router.delete("/delete/:id", deleteMedicine);

router.get("/get-all", getAllMedicine);

export default router;
