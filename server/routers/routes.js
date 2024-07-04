import express from "express";
import authRouter from "./authRouter.js";
import employeeRouter from "./employeeRouter.js";
import medicineCategoryRouter from "./medicineCategoryRouter.js";
import medicineRouter from "./medicineRouter.js";
import patientRouter from "./patientRouter.js";
import medicalServiceRouter from "./medicalServiceRouter.js";
import medicalRecordRouter from "./medicalRecordRouter.js";
import prescriptionRouter from "./prescriptionRouter.js";
import medicalServiceInvoiceRouter from "./medicalServiceInvoiceRouter.js";
import appointmentRouter from "./appointmentRouter.js";
import invoiceRouter from "./invoiceRouter.js";
import messageRouter from "./messageRouter.js";
import conversationRouter from "./conversationRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
router.use("/medicine", medicineRouter);
router.use("/medicine-category", medicineCategoryRouter);
router.use("/patient", patientRouter);
router.use("/medical-service", medicalServiceRouter);
router.use("/medical-record", medicalRecordRouter);
router.use("/prescription", prescriptionRouter);
router.use("/medical-service-invoice", medicalServiceInvoiceRouter);
router.use("/appointment", appointmentRouter);
router.use("/invoice", invoiceRouter);

router.use("/message", messageRouter);
router.use("/conversation", conversationRouter);
router.use("/user", userRouter);

export default router;
