import express from "express";
import {
  createEmployee,
  deleteEmployee,
  employeeLogin,
  getEmployees,
  getCollection,
  getEmployeeDetail,
  terminatedEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/collection", getCollection);

router.get("/employees", getEmployees);

router.post("/login", employeeLogin);

router.post("/create", createEmployee);

router.put("/update/:id", updateEmployee);

router.delete("/delete/:id", deleteEmployee);

router.put("/terminated/:id", terminatedEmployee);

router.get("/:id", getEmployeeDetail);

export default router;
