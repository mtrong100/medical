import Medicine from "../models/medicineModel.js";

export const createNewMedicine = async (req, res) => {
  try {
    const { price, stock } = req.body;
    const total = (price * stock).toFixed(2);

    const newMedicine = new Medicine({
      ...req.body,
      total,
    });

    await newMedicine.save();
    res.status(200).json(newMedicine);
  } catch (error) {
    console.log("Error in createNewMedicine controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const { price, stock } = req.body;

    const currentMedicine = await Medicine.findById(req.params.id);

    if (!currentMedicine) {
      return res.status(404).json({ error: "Không tìm thấy thuốc" });
    }

    const newPrice = price !== undefined ? price : currentMedicine.price;
    const newStock = stock !== undefined ? stock : currentMedicine.stock;
    const total = parseFloat((newPrice * newStock).toFixed(2));

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        total,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedMedicine);
  } catch (error) {
    console.log("Error in updateMedicine controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Error in deleteMedicine controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMedicine = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, unit } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (unit) {
      filter.unit = unit;
    }

    const skip = (page - 1) * limit;

    const medicines = await Medicine.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("category", "_id name")
      .sort({ createdAt: -1 });

    const total = await Medicine.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      results: medicines,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Error in getAllMedicine controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicineCollection = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate("category", "_id name");
    res.status(200).json(medicines);
  } catch (error) {
    console.log("Error in getMedicineCollection controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
