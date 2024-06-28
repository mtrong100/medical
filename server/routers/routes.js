import express from "express";
import authRouter from "./authRouter.js";
import employeeRouter from "./employeeRouter.js";
import medicineCategoryRouter from "./medicineCategoryRouter.js";
import medicineRouter from "./medicineRouter.js";
import patientRouter from "./patientRouter.js";
import medicalServiceRouter from "./medicalServiceRouter.js";
import medicalRecordRouter from "./medicalRecordRouter.js";
import prescriptionRouter from "./prescriptionRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
router.use("/medicine", medicineRouter);
router.use("/medicine-category", medicineCategoryRouter);
router.use("/patient", patientRouter);
router.use("/medical-service", medicalServiceRouter);
router.use("/medical-record", medicalRecordRouter);
router.use("/prescription", prescriptionRouter);

export default router;
