import MedicineCategory from "../models/medicineCategoryModel.js";
import Medicine from "../models/medicineModel.js";

export const getMedicineCategoryCollectionService = async () => {
  try {
    const data = await MedicineCategory.find();

    if (!data || data.length === 0) {
      throw new Error("Không tìm thấy danh mục thuốc");
    }

    return data;
  } catch (error) {
    console.log("Lỗi tại service getMedicineCategoryCollectionService", error);
    throw new Error(error.message);
  }
};

export const getMedicineCategoriesService = async (page, limit) => {
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

  return {
    categories,
    total,
    totalPages,
  };
};

export const createMedicineCategoryService = async (data) => {
  try {
    const category = new MedicineCategory(data);
    await category.save();
    return category;
  } catch (error) {
    console.log("Lỗi tại service createMedicineCategoryService", error);
    throw new Error(error.message);
  }
};

export const updateMedicineCategoryService = async (id, data) => {
  try {
    const category = await MedicineCategory.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!category) {
      throw new Error("Không tìm thấy danh mục thuốc");
    }

    return category;
  } catch (error) {
    console.log("Lỗi tại service updateMedicineCategoryService", error);
    throw new Error(error.message);
  }
};

export const deleteMedicineCategoryService = async (id) => {
  try {
    const medicineCount = await Medicine.countDocuments({ category: id });

    if (medicineCount > 0) {
      throw new Error("Danh mục thuốc đang được sử dụng");
    }

    const category = await MedicineCategory.findByIdAndDelete(id);

    if (!category) {
      throw new Error("Không tìm thấy danh mục thuốc");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteMedicineCategoryService", error);
    throw new Error(error.message);
  }
};
