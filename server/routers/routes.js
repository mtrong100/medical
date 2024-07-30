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
router.use("/employees", employeeRouter);
router.use("/auth", authRouter);
router.use("/medicine-categories", medicineCategoryRouter);
router.use("/suppliers", supplierRouter);
router.use("/devices", deviceRouter);
router.use("/medicines", medicineRouter);
router.use("/medical-services", medicalServiceRouter);
router.use("/medical-records", medicalRecordRouter);
router.use("/prescriptions", prescriptionRouter);
router.use("/medical-service-invoices", medicalServiceInvoiceRouter);
router.use("/invoices", invoiceRouter);
router.use("/appointments", appointmentRouter);

router.use("/statistic", stastisticRouter);
router.use("/message", messageRouter);
router.use("/inventory", inventoryRouter);
router.use("/conversation", conversationRouter);

export default router;
