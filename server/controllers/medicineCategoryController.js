import MedicineCategory from "../models/medicineCategoryModel.js";
import Medicine from "../models/medicineModel.js";

export const createNewMedicineCategory = async (req, res) => {
  try {
    const category = new MedicineCategory(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.log("Error in createNewMedicineCategory controller", error);
    return res.status(500).json({ error: "Internal server error" });
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
    console.log("Error in updateMedicineCategory controller", error);
    return res.status(500).json({ error: "Internal server error" });
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
    res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Error in deleteMedicineCategory controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMedicineCategory = async (req, res) => {
  try {
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
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.log("Error in getAllMedicineCategory controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
