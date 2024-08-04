import {
  createInventoryService,
  deleteInventoryService,
  getInventoryDetailService,
  getInventoryService,
  updateInventoryService,
} from "../services/inventoryService.js";
import mongoose from "mongoose";

export const getInventory = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const inventoryData = await getInventoryService(page, limit);
    return res.status(200).json(inventoryData);
  } catch (error) {
    console.log("Lỗi tại controller getInventory", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getInventoryDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const inventoryDetail = await getInventoryDetailService(id);
    return res.status(200).json(inventoryDetail);
  } catch (error) {
    console.log("Lỗi tại controller getInventoryDetail", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createInventory = async (req, res) => {
  try {
    const inventory = await createInventoryService(req.body);
    return res.status(200).json(inventory);
  } catch (error) {
    console.log("Lỗi tại controller createInventory", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const inventory = await updateInventoryService(id);
    return res.status(200).json(inventory);
  } catch (error) {
    console.log("Lỗi tại controller updateInventory", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteInventoryService(id);
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deleteInventory", error);
    return res.status(500).json({ message: error.message });
  }
};
