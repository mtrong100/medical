import express from "express";
import {
  createNewDoctor,
  deleteDoctor,
  doctorLogin,
  firedDoctor,
  getAllDoctors,
  getDoctorDetail,
  lockAccount,
  updateDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/get-all", getAllDoctors);

router.get("/:id", getDoctorDetail);

router.post("/login", doctorLogin);

router.post("/create", createNewDoctor);

router.put("/update/:id", updateDoctor);

router.delete("/delete/:id", deleteDoctor);

router.put("/fired/:id", firedDoctor);

router.put("/lock/:id", lockAccount);

export default router;
