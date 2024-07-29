import {
  createPrescriptionService,
  deletePrescriptionService,
  getPrescriptionCollectionService,
  getPrescriptionDetailService,
  getPrescriptionsService,
} from "../services/prescriptionService.js";
import mongoose from "mongoose";

export const getPrescriptionCollection = async (req, res) => {
  try {
    const data = await getPrescriptionCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPrescriptions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await getPrescriptionsService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getPrescriptions", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPrescriptionDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getPrescriptionDetailService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getPrescriptionDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPrescription = async (req, res) => {
  const prescriptionData = req.body;

  try {
    const newPrescription = await createPrescriptionService(prescriptionData);
    return res.status(201).json(newPrescription);
  } catch (error) {
    console.log("Lỗi tại controller createPrescription", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePrescription = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deletePrescriptionService(id);
    return res.status(200).json({ message: "Xóa đơn thuốc thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deletePrescription", error);
    return res.status(500).json({ message: error.message });
  }
};
