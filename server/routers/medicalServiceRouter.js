import express from "express";
import {
  createNewService,
  deleteService,
  getAllServices,
  updateService,
} from "../controllers/medicalServiceController.js";

const router = express.Router();

router.post("/create", createNewService);

router.put("/update/:id", updateService);

router.delete("/delete/:id", deleteService);

router.get("/get-all", getAllServices);

export default router;
