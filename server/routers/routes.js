import express from "express";
import authRouter from "./authRouter.js";
import employeeRouter from "./employeeRouter.js";
import medicineCategoryRouter from "./medicineCategoryRouter.js";
import medicineRouter from "./medicineRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
router.use("/medicine", medicineRouter);
router.use("/medicine-category", medicineCategoryRouter);

export default router;
