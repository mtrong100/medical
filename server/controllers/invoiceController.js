import {
  createInvoiceService,
  deleteInvoiceService,
  getInvoiceCollectionService,
  getInvoiceDetailService,
  getInvoicesService,
  getInvoiceStatsService,
  updateInvoiceService,
} from "../services/invoiceService.js";
import mongoose from "mongoose";

export const getInvoiceCollection = async (req, res) => {
  try {
    const data = await getInvoiceCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in getCollection controller", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const invoicesData = await getInvoicesService({ page, limit });
    return res.status(200).json(invoicesData);
  } catch (error) {
    console.log("Lỗi tại controller getInvoices", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getInvoiceDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const invoiceDetail = await getInvoiceDetailService(id);
    return res.status(200).json(invoiceDetail);
  } catch (error) {
    console.log("Error in getInvoiceDetail controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getInvoiceStats = async (req, res) => {
  try {
    const data = await getInvoiceStatsService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in getInvoiceStats controller", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  const {
    patient: patientId,
    doctor: doctorId,
    price,
    healthInsurance,
  } = req.body;

  try {
    const newInvoice = await createInvoiceService({
      patientId,
      doctorId,
      price,
      healthInsurance,
    });
    return res.status(201).json(newInvoice);
  } catch (error) {
    console.log("Lỗi tại controller createInvoice", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const {
    patient: patientId,
    doctor: doctorId,
    price,
    healthInsurance,
    paymentStatus,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedInvoice = await updateInvoiceService({
      id,
      patientId,
      doctorId,
      price,
      healthInsurance,
      paymentStatus,
    });
    return res.status(200).json(updatedInvoice);
  } catch (error) {
    console.log("Lỗi tại controller updateInvoice", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteInvoiceService(id);
    return res.status(200).json({ message: "Xóa hóa đơn thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deleteInvoice", error);
    return res.status(500).json({ message: error.message });
  }
};
