import express from "express";
import {
  getFigures,
  getMonthlyExpense,
  getMonthlyRevenue,
  getRevenue,
} from "../controllers/stastisticController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/revenue", verifyAdmin, getRevenue);

router.get("/figures", verifyAdmin, getFigures);

router.get("/monthly-revenue", verifyAdmin, getMonthlyRevenue);

router.get("/monthly-expense", verifyAdmin, getMonthlyExpense);

export default router;
