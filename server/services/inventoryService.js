import Device from "../models/deviceModel.js";
import Inventory from "../models/inventoryModel.js";
import Medicine from "../models/medicineModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const getInventoryService = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Inventory.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const inventory = await Inventory.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .populate("supplier", "_id name")
      .populate("items.medicine", "_id name category price")
      .populate("items.device", "_id name category price");

    const formattedInventory = inventory.map((inv) => ({
      _id: inv._id,
      supplier: inv.supplier.name,
      total: inv.total,
      itemType: inv.itemType,
      status: inv.status,
      items: inv.items.map((item) => {
        if (inv.itemType === "Medicine" && item.medicine) {
          return {
            name: item.medicine.name,
            quantity: item.quantity,
            price: item.medicine.price,
          };
        } else {
          return {
            name: item.device.name,
            quantity: item.quantity,
            // category: item.device.category,
            price: item.device.price,
          };
        }
      }),
      createdAt: inv.createdAt,
      updatedAt: inv.updatedAt,
    }));

    return {
      results: formattedInventory,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getInventoryData: ", error);
    throw new Error(error.message);
  }
};

export const getInventoryDetailService = async (id) => {
  try {
    const inventory = await Inventory.findById(id)
      .populate("supplier", "_id name")
      .populate("items.medicine", "_id name")
      .populate("items.device", "_id name");

    if (!inventory) {
      throw new Error("Inventory not found");
    }

    const formattedInventory = {
      _id: inventory._id,
      supplier: inventory.supplier.name,
      total: inventory.total,
      itemType: inventory.itemType,
      status: inventory.status,
      items: inventory.items.map((item) => {
        if (inventory.itemType === "Medicine" && item.medicine) {
          return {
            medicine: item.medicine.name,
            quantity: item.quantity,
          };
        } else {
          return {
            device: item.device.name,
            quantity: item.quantity,
            category: item.device.category,
            price: item.device.price,
          };
        }
      }),
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    };

    return formattedInventory;
  } catch (error) {
    console.log("Lỗi tại service getInventoryDetail: ", error);
    throw new Error(error.message);
  }
};

export const getInventoryStatsService = async () => {
  try {
    // Count unpaid and paid inventory items
    const unPaidInventory = await Inventory.find({
      status: PAYMENT_STATUS.UNPAID,
    }).countDocuments();

    const paidInventory = await Inventory.find({
      status: PAYMENT_STATUS.PAID,
    }).countDocuments();

    // Count device and medicine inventory items
    const deviceInventory = await Inventory.find({
      itemType: "Device",
    }).countDocuments();

    const medicineInventory = await Inventory.find({
      itemType: "Medicine",
    }).countDocuments();

    // Calculate total expenses for device and medicine inventory items
    const deviceTotalExpense = await Inventory.aggregate([
      { $match: { itemType: "Device" } },
      { $group: { _id: null, totalExpense: { $sum: "$total" } } },
    ]);

    const medicineTotalExpense = await Inventory.aggregate([
      { $match: { itemType: "Medicine" } },
      { $group: { _id: null, totalExpense: { $sum: "$total" } } },
    ]);

    const results = {
      statusStats: [paidInventory, unPaidInventory],
      categoryStats: [deviceInventory, medicineInventory],
      expenseStats: [
        deviceTotalExpense[0] ? deviceTotalExpense[0].totalExpense : 0,
        medicineTotalExpense[0] ? medicineTotalExpense[0].totalExpense : 0,
      ],
    };

    return results;
  } catch (error) {
    console.log("Lỗi tại service getInventoryStats: ", error);
    throw new Error(error.message);
  }
};

export const createInventoryService = async (data) => {
  const { items, itemType } = data;

  try {
    const inventory = await Inventory.create(data);

    for (const item of items) {
      if (itemType === "Medicine") {
        await Medicine.findByIdAndUpdate(item.medicine, {
          $inc: { stock: item.quantity },
        });
      } else if (itemType === "Device") {
        await Device.findByIdAndUpdate(item.device, {
          $inc: { stock: item.quantity },
        });
      }
    }

    return inventory;
  } catch (error) {
    console.log("Lỗi tại service createInventoryService: ", error);
    throw new Error(error.message);
  }
};

export const updateInventoryService = async (id) => {
  try {
    // Fetch the current inventory item
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      throw new Error("Inventory not found");
    }

    // Toggle the status
    const newStatus =
      inventory.status === PAYMENT_STATUS.PAID
        ? PAYMENT_STATUS.UNPAID
        : PAYMENT_STATUS.PAID;

    // Update the inventory item with the new status
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      {
        status: newStatus,
      },
      {
        new: true,
      }
    );

    return updatedInventory;
  } catch (error) {
    console.log("Lỗi tại service updateInventoryService: ", error);
    throw new Error(error.message);
  }
};

export const deleteInventoryService = async (id) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(id);

    if (!inventory) {
      throw new Error("Inventory not found");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteInventoryService: ", error);
    throw new Error(error.message);
  }
};
