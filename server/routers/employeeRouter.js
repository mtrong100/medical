import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeeCollection,
  getEmployeeDetail,
  terminatedEmployee,
  updateEmployee,
  getEmployeeStats,
} from "../controllers/employeeController.js";
import {
  validateCreateEmployeeData,
  validateUpdateEmployeeData,
} from "../validation/employeeValidate.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getEmployeeCollection);

router.get("/", verifyUser, getEmployees);

router.get("/stats", verifyAdmin, getEmployeeStats);

router.get("/:id", verifyAdmin, getEmployeeDetail);

router.post("/create", verifyAdmin, validateCreateEmployeeData, createEmployee);

router.put(
  "/update/:id",
  verifyAdmin,
  validateUpdateEmployeeData,
  updateEmployee
);

router.delete("/delete/:id", verifyAdmin, deleteEmployee);

router.put("/terminated/:id", verifyAdmin, terminatedEmployee);

export default router;
