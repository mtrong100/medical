import express from "express";
import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  getCollection,
  updateMedicine,
  getMedicineDetail,
} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/medicines", getMedicines);

router.get("/:id", getMedicineDetail);

router.post("/create", createMedicine);

router.put("/update/:id", updateMedicine);

router.delete("/delete/:id", deleteMedicine);

export default router;
