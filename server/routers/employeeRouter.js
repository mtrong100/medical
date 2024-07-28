import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeeCollection,
  getEmployeeDetail,
  terminatedEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import {
  validateCreateEmployeeData,
  validateUpdateEmployeeData,
} from "../validation/employeeValidate.js";

const router = express.Router();

router.get("/collection", getEmployeeCollection);

router.get("/", getEmployees);

router.get("/:id", getEmployeeDetail);

router.post("/create", validateCreateEmployeeData, createEmployee);

router.put("/update/:id", validateUpdateEmployeeData, updateEmployee);

router.delete("/delete/:id", deleteEmployee);

router.put("/terminated/:id", terminatedEmployee);

export default router;
