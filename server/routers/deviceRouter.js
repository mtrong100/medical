import express from "express";
import {
  createDevice,
  deleteDevice,
  getDeviceDetail,
  getDevices,
  updateDevice,
} from "../controllers/deviceController.js";

const router = express.Router();

router.get("/devices", getDevices);
router.get("/:id", getDeviceDetail);
router.post("/create", createDevice);
router.put("/update/:id", updateDevice);
router.delete("/delete/:id", deleteDevice);

export default router;
