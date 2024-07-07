import express from "express";

import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";
import {
  createNewPrescription,
  deletePrescription,
  getAllPrescriptions,
  getPrescriptionDetail,
  updatePrescription,
  getCollection,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.get("/collection", verifySpecificRole, getCollection);

router.post("/create", verifySpecificRole, createNewPrescription);

router.put("/update/:id", verifySpecificRole, updatePrescription);

router.delete("/delete/:id", verifySpecificRole, deletePrescription);

router.get("/get-all", getAllPrescriptions);

router.get("/:id", getPrescriptionDetail);

export default router;
