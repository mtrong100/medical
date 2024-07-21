import express from "express";
import {
  getFigures,
  getMonthlyRevenue,
  getRevenue,
} from "../controllers/stastisticController.js";

const router = express.Router();

router.get("/revenue", getRevenue);
router.get("/figures", getFigures);
router.get("/monthly-revenue", getMonthlyRevenue);

export default router;
