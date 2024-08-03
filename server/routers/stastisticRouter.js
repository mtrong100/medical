import express from "express";
import {
  getFigures,
  getMonthlyRevenueAndExpense,
  getRevenue,
} from "../controllers/stastisticController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/revenue", verifyAdmin, getRevenue);

router.get("/figures", verifyAdmin, getFigures);

router.get(
  "/monthly-revenue-expense",
  verifyAdmin,
  getMonthlyRevenueAndExpense
);

export default router;
