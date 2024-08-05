import MedicineCategory from "../models/medicineCategoryModel.js";
import Medicine from "../models/medicineModel.js";

export const getMedicineCollectionService = async () => {
  try {
    const medicines = await Medicine.find();

    if (!medicines || medicines.length === 0) {
      throw new Error("Không tìm thấy collection thuốc");
    }

    return medicines;
  } catch (error) {
    console.log("Lỗi tại service getMedicineCollectionService", error);
    throw new Error(error.message);
  }
};

export const getMedicinesService = async (filter, page, limit) => {
  try {
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

    return {
      results: data,
      total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getMedicinesService", error);
    throw new Error(error.message);
  }
};

export const getMedicineDetailService = async (id) => {
  try {
    const medicine = await Medicine.findById(id);
    if (!medicine) {
      throw new Error("Không tìm thấy thuốc");
    }
    return medicine;
  } catch (error) {
    console.log("Lỗi tại service getMedicineDetailService", error);
    throw new Error("Lỗi khi lấy chi tiết thuốc từ cơ sở dữ liệu");
  }
};

export const getMedicineStatsService = async () => {
  try {
    const categories = await MedicineCategory.find();
    const categoriesResults = categories.map((item) => item.name);

    const medicineCountResults = [];
    const averagePriceResults = [];

    for (const cat of categories) {
      const medicinesInCategory = await Medicine.find({
        category: cat._id,
      });

      const medicineCount = medicinesInCategory.length;
      medicineCountResults.push(medicineCount);

      const totalPrice = medicinesInCategory.reduce(
        (acc, medicine) => acc + medicine.price,
        0
      );
      const averagePrice = medicineCount > 0 ? totalPrice / medicineCount : 0;
      averagePriceResults.push(averagePrice.toFixed(2));
    }

    const results = {
      categories: categoriesResults,
      medicineCount: medicineCountResults,
      averagePrices: averagePriceResults,
    };

    return results;
  } catch (error) {
    console.log("Lỗi tại service getMedicineStatsService", error);
    throw new Error(error.message);
  }
};

export const createMedicineService = async (data) => {
  try {
    const medicine = new Medicine(data);
    await medicine.save();
  } catch (error) {
    console.log("Lỗi tại service createMedicineService", error);
    throw new Error(error.message);
  }
};

export const updateMedicineService = async (id, data) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(id, data);

    if (!medicine) {
      throw new Error("Không tìm thấy thuốc");
    }

    return medicine;
  } catch (error) {
    console.log("Lỗi tại service updateMedicineService", error);
    throw new Error(error.message);
  }
};

export const deleteMedicineService = async (id) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(id);
    if (!medicine) {
      throw new Error("Không tìm thấy thuốc");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteMedicineService", error);
    throw new Error(error.message);
  }
};
