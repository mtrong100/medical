import {
  createSupplierService,
  deleteSupplierService,
  getSupplierCollectionService,
  getSupplierDetailService,
  getSuppliersService,
  updateSupplierService,
} from "../services/supplierService.js";
import mongoose from "mongoose";

export const getSupplierCollection = async (req, res) => {
  try {
    const data = await getSupplierCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getSupplierCollection", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSuppliers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const {
      data,
      total,
      totalPages,
      currentPage,
      limit: pageLimit,
    } = await getSuppliersService(parseInt(page), parseInt(limit));

    return res.status(200).json({
      results: data,
      totalResults: total,
      totalPages,
      currentPage,
      limit: pageLimit,
    });
  } catch (error) {
    console.log("Lỗi tại controller getSuppliers", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getSupplierDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const supplier = await getSupplierDetailService(id);
    return res.status(200).json(supplier);
  } catch (error) {
    console.log("Lỗi tại controller getSupplierDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const newSupplier = await createSupplierService(req.body);
    return res.status(201).json(newSupplier);
  } catch (error) {
    console.log("Lỗi tại controller createSupplier", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedSupplier = await updateSupplierService(id, req.body);

    return res.status(200).json(updatedSupplier);
  } catch (error) {
    console.log("Lỗi tại controller updateSupplier", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteSupplierService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteSupplier", error);
    return res.status(500).json({ message: error.message });
  }
};
