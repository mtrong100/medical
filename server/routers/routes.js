import userRouter from "./userRouter.js";
import prescriptionRouter from "./prescriptionRouter.js";
import patientRouter from "./patientRouter.js";
import messageRouter from "./messageRouter.js";
import medicineRouter from "./medicineRouter.js";
import medicineCategoryRouter from "./medicineCategoryRouter.js";
import medicalServiceRouter from "./medicalServiceRouter.js";
import medicalServiceInvoiceRouter from "./medicalServiceInvoiceRouter.js";
import medicalRecordRouter from "./medicalRecordRouter.js";
import invoiceRouter from "./invoiceRouter.js";
import express from "express";
import employeeRouter from "./employeeRouter.js";
import conversationRouter from "./conversationRouter.js";
import authRouter from "./authRouter.js";
import appointmentRouter from "./appointmentRouter.js";
import stastisticRouter from "./stastisticRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/prescription", prescriptionRouter);
router.use("/patient", patientRouter);
router.use("/message", messageRouter);
router.use("/medicine", medicineRouter);
router.use("/medicine-category", medicineCategoryRouter);
router.use("/medical-service", medicalServiceRouter);
router.use("/medical-service-invoice", medicalServiceInvoiceRouter);
router.use("/medical-record", medicalRecordRouter);
router.use("/invoice", invoiceRouter);
router.use("/employee", employeeRouter);
router.use("/conversation", conversationRouter);
router.use("/auth", authRouter);
router.use("/appointment", appointmentRouter);
router.use("/statistic", stastisticRouter);

export default router;
