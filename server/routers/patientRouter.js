import express from "express";
import {
  createNewPatient,
  deletePatient,
  getAllPatients,
  updatePatient,
} from "../controllers/patientController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewPatient);

router.put("/update/:id", verifySpecificRole, updatePatient);

router.delete("/delete/:id", verifySpecificRole, deletePatient);

router.get("/get-all", getAllPatients);

export default router;
