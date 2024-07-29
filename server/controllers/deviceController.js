import {
  createDeviceService,
  deleteDeviceService,
  getDeviceCollectionService,
  getDeviceDetailService,
  getDevicesService,
  updateDeviceService,
} from "../services/deviceService.js";
import mongoose from "mongoose";

export const getDeviceCollection = async (req, res) => {
  try {
    const devices = await getDeviceCollectionService();
    return res.status(200).json(devices);
  } catch (error) {
    console.log("Lỗi tại controller getDeviceCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getDevices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const devicesData = await getDevicesService(page, limit);
    return res.status(200).json(devicesData);
  } catch (error) {
    console.log("Lỗi tại controller getDevices", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getDeviceDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const device = await getDeviceDetailService(id);
    return res.status(200).json(device);
  } catch (error) {
    console.log("Lỗi tại controller getDeviceDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createDevice = async (req, res) => {
  try {
    const newDevice = await createDeviceService(req.body);
    return res.status(200).json(newDevice);
  } catch (error) {
    console.log("Lỗi tại controller createDevice", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateDevice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedDevice = await updateDeviceService(id, req.body);
    return res.status(200).json(updatedDevice);
  } catch (error) {
    console.log("Lỗi tại controller updateDevice", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDevice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteDeviceService(id);
    return res.status(200).json({ message: "Xóa này" });
  } catch (error) {
    console.log("Lỗi tại controller deleteDevice", error);
    return res.status(500).json({ message: error.message });
  }
};
