import express from "express";
import authRouter from "./authRouter.js";
import doctorRouter from "./doctorRouter.js";
import employeeRouter from "./employeeRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/doctor", doctorRouter);
router.use("/employee", employeeRouter);

export default router;
