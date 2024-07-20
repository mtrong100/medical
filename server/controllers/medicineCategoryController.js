import MedicineCategory from "../models/medicineCategoryModel.js";
import Medicine from "../models/medicineModel.js";

export const createMedicineCategory = async (req, res) => {
  try {
    const category = new MedicineCategory(req.body);
    await category.save();
    return res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi tại controller createMedicineCategory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateMedicineCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await MedicineCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicineCategory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteMedicineCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const medicineCount = await Medicine.countDocuments({ category: id });

    if (medicineCount > 0) {
      return res
        .status(400)
        .json({ message: "Không thể xóa danh mục đã có thuốc" });
    }

    await MedicineCategory.findByIdAndDelete(id);

    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicineCategory", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicineCategories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await MedicineCategory.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const categories = await MedicineCategory.aggregate([
      {
        $lookup: {
          from: "medicines",
          localField: "_id",
          foreignField: "category",
          as: "medicines",
        },
      },
      {
        $addFields: {
          medicineCount: { $size: "$medicines" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          createdAt: 1,
          updatedAt: 1,
          medicineCount: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
    ]);

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

export const getCollection = async (req, res) => {
  try {
    const data = await MedicineCategory.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
