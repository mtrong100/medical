import {
  createMedicalRecordService,
  deleteMedicalRecordService,
  getMedicalRecordDetailService,
  getMedicalRecordsService,
  updateMedicalRecordService,
} from "../services/medicalRecordService.js";
import mongoose from "mongoose";

export const getMedicalRecords = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const { results, totalResults, totalPages } =
      await getMedicalRecordsService(parseInt(page), parseInt(limit));
    return res.status(200).json({
      results,
      totalResults,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getMedicalRecords", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicalRecordDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const medicalRecordDetail = await getMedicalRecordDetailService(id);
    return res.status(200).json(medicalRecordDetail);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalRecordDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createMedicalRecord = async (req, res) => {
  try {
    const newMedicalRecord = await createMedicalRecordService(req.body);
    return res.status(201).json(newMedicalRecord);
  } catch (error) {
    console.log("Lỗi tại controller createMedicalRecord", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedicalRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const medicalRecord = await updateMedicalRecordService(id, req.body);
    return res.status(200).json(medicalRecord);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalRecord", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedicalRecord = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteMedicalRecordService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicalRecord", error);
    return res.status(500).json({ message: error.message });
  }
};
