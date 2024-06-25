import express from "express";
import {
  createNewEmployee,
  deleteEmployee,
  employeeLogin,
  getAllEmployees,
  getEmployeeDetail,
  lockEmployeeAccount,
  terminatedEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import { protectedEmployee } from "../middlewares/protectedEmployee.js";

const router = express.Router();

router.post("/login", employeeLogin);

router.get("/get-all", getAllEmployees);

router.get("/:id", getEmployeeDetail);

router.post("/create", protectedEmployee, createNewEmployee);

router.put("/update/:id", protectedEmployee, updateEmployee);

router.delete("/delete/:id", protectedEmployee, deleteEmployee);

router.put("/terminated/:id", protectedEmployee, terminatedEmployee);

router.put("/lock/:id", protectedEmployee, lockEmployeeAccount);

export default router;
