import Device from "../models/deviceModel.js";
import Inventory from "../models/inventoryModel.js";
import Medicine from "../models/medicineModel.js";

export const getInventory = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await Inventory.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const inventory = await Inventory.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .populate("supplier", "_id name")
      .populate("items.medicine", "_id name")
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
          };
        } else {
          return {
            name: item.device.name,
            quantity: item.quantity,
            category: item.device.category,
            price: item.device.price,
          };
        }
      }),
      createdAt: inv.createdAt,
      updatedAt: inv.updatedAt,
    }));

    return res.status(200).json({
      results: formattedInventory,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getInventory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getInventoryDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await Inventory.findById(id)
      .populate("supplier", "_id name")
      .populate("items.medicine", "_id name")
      .populate("items.device", "_id name");

    // Kiểm tra nếu không tìm thấy tồn kho với ID
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    // Format kết quả trả về
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

    return res.status(200).json(formattedInventory);
  } catch (error) {
    console.log("Lỗi tại controller getInventoryDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createInventory = async (req, res) => {
  const { items } = req.body;

  try {
    const inventory = await Inventory.create(req.body);

    for (const item of items) {
      if (item.itemType === "Medicine") {
        await Medicine.findByIdAndUpdate(item.medicine, {
          $inc: { stock: item.quantity },
        });
      } else if (item.itemType === "Device") {
        await Device.findByIdAndUpdate(item.device, {
          $inc: { stock: item.quantity },
        });
      }
    }

    return res.status(200).json(inventory);
  } catch (error) {
    console.log("Lỗi tại controller createInventory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    await Inventory.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deleteInventory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
