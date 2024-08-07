import express from "express";
import {
  createDevice,
  deleteDevice,
  getDeviceCollection,
  getDeviceDetail,
  getDevices,
  getDeviceStats,
  updateDevice,
} from "../controllers/deviceController.js";
import {
  validateDeviceData,
  validateUpdateDeviceData,
} from "../validation/deviceValidate.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/collection", verifyAdmin, getDeviceCollection);

router.get("/", verifyAdmin, getDevices);

router.get("/stats", getDeviceStats);

router.get("/:id", verifyAdmin, getDeviceDetail);

router.post("/create", verifyAdmin, validateDeviceData, createDevice);

router.put("/update/:id", verifyAdmin, validateUpdateDeviceData, updateDevice);

router.delete("/delete/:id", verifyAdmin, deleteDevice);

export default router;
