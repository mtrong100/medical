import {
  createMedicineCategoryService,
  deleteMedicineCategoryService,
  getMedicineCategoriesService,
  getMedicineCategoryCollectionService,
  updateMedicineCategoryService,
} from "../services/medicineCategoryService.js";
import mongoose from "mongoose";

export const getMedicineCategoryCollection = async (req, res) => {
  try {
    const data = await getMedicineCategoryCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getMedicineCategoryCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicineCategories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const { categories, total, totalPages } =
      await getMedicineCategoriesService(page, limit);

    return res.status(200).json({
      results: categories,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getMedicineCategories", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createMedicineCategory = async (req, res) => {
  try {
    const category = await createMedicineCategoryService(req.body);
    return res.status(201).json(category);
  } catch (error) {
    console.log("Lỗi tại controller createMedicineCategory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateMedicineCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const category = await updateMedicineCategoryService(id, req.body);
    return res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicineCategory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteMedicineCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteMedicineCategoryService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicineCategory", error);
    return res.status(500).json({ message: error.message || "Lỗi server" });
  }
};
