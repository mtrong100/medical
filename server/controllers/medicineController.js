import Medicine from "../models/medicineModel.js";

export const createMedicine = async (req, res) => {
  const { price, stock, ...data } = req.body;

  try {
    const total = (price * stock).toFixed(2);

    const newMedicine = new Medicine({
      ...data,
      stock,
      price,
      total,
    });

    await newMedicine.save();

    return res.status(200).json(newMedicine);
  } catch (error) {
    console.log("Lỗi tại controller createMedicine", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const { price, stock, ...data } = req.body;

  try {
    const currentMedicine = await Medicine.findById(id);

    if (!currentMedicine) {
      return res.status(404).json({ message: "Không tìm thấy thuốc" });
    }

    const newPrice =
      price !== undefined ? parseFloat(price) : currentMedicine.price;
    const newStock =
      stock !== undefined ? parseInt(stock) : currentMedicine.stock;
    const total = parseFloat((newPrice * newStock).toFixed(2));

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      {
        ...data,
        price: newPrice,
        stock: newStock,
        total,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedMedicine);
  } catch (error) {
    console.error("Error in updateMedicine controller", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicine", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicines = async (req, res) => {
  const { page = 1, limit = 10, category, unit } = req.query;

  try {
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (unit) {
      filter.unit = unit;
    }

    const skip = (page - 1) * limit;
    const total = await Medicine.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const medicines = await Medicine.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("category", "_id name")
      .sort({ createdAt: -1 });

    const data = medicines.map((item) => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      unit: item.unit,
      total: item.total,
      category: item.category.name,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return res.status(200).json({
      results: data,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getMedicines", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    return res.status(200).json(medicines);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicineDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const medicine = await Medicine.findById(id);
    return res.status(200).json(medicine);
  } catch (error) {
    console.log("Lỗi tại controller getMedicineDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
