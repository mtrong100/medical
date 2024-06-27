import express from "express";
import {
  createNewPatient,
  deletePatient,
  getAllPatients,
  updatePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/create", createNewPatient);

router.put("/update/:id", updatePatient);

router.delete("/delete/:id", deletePatient);

router.get("/get-all", getAllPatients);

export default router;
