import express from "express";
import authRouter from "./authRouter.js";
import employeeRouter from "./employeeRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);

export default router;
