import {
  createMedicalServiceInvoiceService,
  deleteMedicalServiceInvoiceService,
  getMedicalServiceInvoiceCollectionService,
  getMedicalServiceInvoiceDetailService,
  getMedicalServiceInvoicesService,
  updateMedicalServiceInvoiceService,
} from "../services/medicalServiceInvoiceService.js";
import mongoose from "mongoose";

export const getMedicalServiceInvoiceCollection = async (req, res) => {
  try {
    const data = await getMedicalServiceInvoiceCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicalServiceInvoices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const result = await getMedicalServiceInvoicesService(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalServiceInvoices", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicalServiceInvoiceDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const result = await getMedicalServiceInvoiceDetailService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalServiceInvoiceDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createMedicalServiceInvoice = async (req, res) => {
  try {
    const newMedicalServiceInvoice = await createMedicalServiceInvoiceService(
      req.body
    );
    return res.status(201).json(newMedicalServiceInvoice);
  } catch (error) {
    console.log("Lỗi tại controller createMedicalServiceInvoice", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedicalServiceInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const data = await updateMedicalServiceInvoiceService(id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalServiceInvoice", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedicalServiceInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteMedicalServiceInvoiceService(id);
    res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicalServiceInvoice", error);
    return res.status(500).json({ message: error.message });
  }
};
