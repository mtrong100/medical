import userRouter from "./userRouter.js";
import supplierRouter from "./supplierRouter.js";
import stastisticRouter from "./stastisticRouter.js";
import prescriptionRouter from "./prescriptionRouter.js";
import patientRouter from "./patientRouter.js";
import messageRouter from "./messageRouter.js";
import medicineRouter from "./medicineRouter.js";
import medicineCategoryRouter from "./medicineCategoryRouter.js";
import medicalServiceRouter from "./medicalServiceRouter.js";
import medicalServiceInvoiceRouter from "./medicalServiceInvoiceRouter.js";
import medicalRecordRouter from "./medicalRecordRouter.js";
import invoiceRouter from "./invoiceRouter.js";
import inventoryRouter from "./inventoryRouter.js";
import express from "express";
import employeeRouter from "./employeeRouter.js";
import deviceRouter from "./deviceRouter.js";
import conversationRouter from "./conversationRouter.js";
import authRouter from "./authRouter.js";
import appointmentRouter from "./appointmentRouter.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/patients", patientRouter);

router.use("/supplier", supplierRouter);
router.use("/statistic", stastisticRouter);
router.use("/prescription", prescriptionRouter);
router.use("/message", messageRouter);
router.use("/medicine", medicineRouter);
router.use("/medicine-category", medicineCategoryRouter);
router.use("/medical-service", medicalServiceRouter);
router.use("/medical-service-invoice", medicalServiceInvoiceRouter);
router.use("/medical-record", medicalRecordRouter);
router.use("/invoice", invoiceRouter);
router.use("/inventory", inventoryRouter);
router.use("/employee", employeeRouter);
router.use("/device", deviceRouter);
router.use("/conversation", conversationRouter);
router.use("/auth", authRouter);
router.use("/appointment", appointmentRouter);

export default router;
