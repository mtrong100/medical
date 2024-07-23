import Supplier from "../models/supplierModel.js";

export const getSuppliers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await Supplier.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const data = await Supplier.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      results: data,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getSuppliers", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getSupplierDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id);
    return res.status(200).json(supplier);
  } catch (error) {
    console.log("Lỗi tại controller getSupplierDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    return res.status(201).json(newSupplier);
  } catch (error) {
    console.log("Lỗi tại controller createSupplier", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedSupplier);
  } catch (error) {
    console.log("Lỗi tại controller updateSupplier", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    await Supplier.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa thanh cong" });
  } catch (error) {
    console.log("Lỗi tại controller deleteSupplier", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
