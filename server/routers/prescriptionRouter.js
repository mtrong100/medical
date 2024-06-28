import express from "express";

import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";
import {
  createNewPrescription,
  deletePrescription,
  getAllPrescriptions,
  updatePrescription,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewPrescription);

router.put("/update/:id", verifySpecificRole, updatePrescription);

router.delete("/delete/:id", verifySpecificRole, deletePrescription);

router.get("/get-all", getAllPrescriptions);

export default router;
