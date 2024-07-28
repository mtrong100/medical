import Supplier from "../models/supplierModel.js";

export const getSupplierCollectionService = async () => {
  try {
    const data = await Supplier.find();

    if (!data || data.length === 0) {
      throw new Error("Không tìm thấy nhà cung cấp");
    }

    return data;
  } catch (error) {
    console.log("Lỗi tại service getSupplierCollectionService", error);
    throw new Error(error.message);
  }
};

export const getSuppliersService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Supplier.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const data = await Supplier.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return {
      data,
      total,
      totalPages,
      currentPage: page,
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getSuppliersService", error);
    throw new Error("Lỗi khi lấy danh sách nhà cung cấp");
  }
};

export const getSupplierDetailService = async (id) => {
  try {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      throw new Error("Không tìm thấy nhà cung cấp");
    }

    return supplier;
  } catch (error) {
    console.log("Lỗi tại service getSupplierDetailService", error);
    throw new Error(error.message);
  }
};

export const createSupplierService = async (body) => {
  try {
    const newSupplier = new Supplier(body);
    await newSupplier.save();
    return newSupplier;
  } catch (error) {
    console.log("Lỗi tại service createSupplierService", error);
    throw new Error(error.message);
  }
};

export const updateSupplierService = async (id, body) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!supplier) {
      throw new Error("Không tìm thấy nhà cung cấp");
    }

    return supplier;
  } catch (error) {
    console.log("Lỗi tại service updateSupplierService", error);
    throw new Error(error.message);
  }
};

export const deleteSupplierService = async (id) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(id);

    if (!supplier) {
      throw new Error("Không tìm thấy nhà cung cấp");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteSupplierService", error);
    throw new Error(error.message);
  }
};
