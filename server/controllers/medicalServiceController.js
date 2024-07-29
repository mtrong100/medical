import {
  createMedicalServiceSerivce,
  deleteMedicalServiceService,
  getMedicalServicesService,
  updateMedicalServiceService,
} from "../services/medicalService.js";
import mongoose from "mongoose";

export const getMedicalServices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await getMedicalServicesService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalServices", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createMedicalService = async (req, res) => {
  try {
    const newService = await createMedicalServiceSerivce(req.body);
    return res.status(200).json(newService);
  } catch (error) {
    console.log("Lỗi tại controller createMedicalService", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedicalService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const service = await updateMedicalServiceService(id, req.body);
    res.status(200).json(service);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalService", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedicalService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteMedicalServiceService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalService", error);
    return res.status(500).json({ message: error.message });
  }
};
