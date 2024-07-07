import express from "express";
import {
  createNewEmployee,
  deleteEmployee,
  employeeLogin,
  getAllEmployees,
  getCollection,
  getEmployeeDetail,
  lockEmployeeAccount,
  terminatedEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.get("/collection", getCollection);

router.post("/login", employeeLogin);

router.get("/get-all", getAllEmployees);

router.get("/:id", getEmployeeDetail);

router.post("/create", verifySpecificRole, createNewEmployee);

router.put("/update/:id", verifySpecificRole, updateEmployee);

router.delete("/delete/:id", verifySpecificRole, deleteEmployee);

router.put("/terminated/:id", verifySpecificRole, terminatedEmployee);

router.put("/lock/:id", verifySpecificRole, lockEmployeeAccount);

export default router;
