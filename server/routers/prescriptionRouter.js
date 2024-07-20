import express from "express";
import {
  createPrescription,
  deletePrescription,
  getPrescriptions,
  getPrescriptionDetail,
  updatePrescription,
  getCollection,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/prescriptions", getPrescriptions);

router.get("/:id", getPrescriptionDetail);

router.post("/create", createPrescription);

router.put("/update/:id", updatePrescription);

router.delete("/delete/:id", deletePrescription);

export default router;
