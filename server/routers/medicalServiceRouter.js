import express from "express";
import {
  createNewService,
  deleteService,
  getAllServices,
  updateService,
} from "../controllers/medicalServiceController.js";
import { verifySpecificRole } from "../middlewares/verifySpecificRole.js";

const router = express.Router();

router.post("/create", verifySpecificRole, createNewService);

router.put("/update/:id", verifySpecificRole, updateService);

router.delete("/delete/:id", verifySpecificRole, deleteService);

router.get("/get-all", getAllServices);

export default router;
