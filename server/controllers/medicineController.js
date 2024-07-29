import mongoose from "mongoose";
import {
  createMedicineService,
  deleteMedicineService,
  getMedicineCollectionService,
  getMedicineDetailService,
  getMedicinesService,
  updateMedicineService,
} from "../services/medicineService.js";

export const getMedicineCollection = async (req, res) => {
  try {
    const medicines = await getMedicineCollectionService();
    return res.status(200).json(medicines);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicines = async (req, res) => {
  const { page = 1, limit = 10, category, unit } = req.query;

  try {
    const filter = {};
    if (category) filter.category = category;
    if (unit) filter.unit = unit;

    const result = await getMedicinesService(filter, page, limit);

    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getMedicines", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicineDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const medicine = await getMedicineDetailService(id);
    return res.status(200).json(medicine);
  } catch (error) {
    console.log("Lỗi tại controller getMedicineDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createMedicine = async (req, res) => {
  try {
    const newMedicine = await createMedicineService(req.body);
    return res.status(200).json(newMedicine);
  } catch (error) {
    console.log("Lỗi tại controller createMedicine", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedicine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedMedicine = await updateMedicineService(id, req.body);
    return res.status(200).json(updatedMedicine);
  } catch (error) {
    console.error("Error in updateMedicine controller", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteMedicineService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicine", error);
    return res.status(500).json({ message: error.message });
  }
};
