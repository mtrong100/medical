import Medicine from "../models/medicineModel.js";
import Prescription from "../models/prescriptionModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const createNewPrescription = async (req, res) => {
  try {
    const { detail } = req.body;

    // Giảm số lượng thuốc trong kho
    for (const item of detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res
          .status(404)
          .json({ error: `Thuốc với ID ${item.medicine} không tồn tại` });
      }

      if (medicine.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Không đủ số lượng cho thuốc ${medicine.name}` });
      }

      medicine.stock -= item.quantity;
      await medicine.save();
    }

    // Tạo mới đơn thuốc
    const newPrescription = new Prescription(req.body);
    await newPrescription.save();

    return res.status(201).json(newPrescription);
  } catch (error) {
    console.log("Lỗi trong controller createNewPrescription", error);
    return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const updatePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { detail, ...otherFields } = req.body;

    // Tìm đơn thuốc hiện tại
    const existingPrescription = await Prescription.findById(id);
    if (!existingPrescription) {
      return res.status(404).json({ error: "Đơn thuốc không tồn tại" });
    }

    // Tăng lại số lượng thuốc trong kho dựa trên đơn thuốc hiện tại
    for (const item of existingPrescription.detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (medicine) {
        medicine.stock += item.quantity;
        await medicine.save();
      }
    }

    // Giảm số lượng thuốc trong kho dựa trên đơn thuốc cập nhật
    for (const item of detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res
          .status(404)
          .json({ error: `Thuốc với ID ${item.medicine} không tồn tại` });
      }

      if (medicine.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Không đủ số lượng cho thuốc ${medicine.name}` });
      }

      medicine.stock -= item.quantity;
      await medicine.save();
    }

    // Cập nhật đơn thuốc với thông tin mới
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      { ...otherFields, detail },
      { new: true }
    );

    return res.status(200).json(updatedPrescription);
  } catch (error) {
    console.log("Lỗi trong controller updatePrescription", error);
    return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm đơn thuốc cần xóa
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ error: "Đơn thuốc không tồn tại" });
    }

    // Xóa đơn thuốc khỏi cơ sở dữ liệu
    await Prescription.findByIdAndDelete(id);

    return res.status(200).json({ message: "Xóa đơn thuốc thành công" });
  } catch (error) {
    console.log("Lỗi trong controller deletePrescription", error);
    return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const getAllPrescriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const prescriptions = await Prescription.find()
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        {
          path: "patient",
          select: "_id name",
        },
        {
          path: "doctor",
          select: "_id name",
        },
        {
          path: "detail.medicine",
          select: "_id name unit price",
        },
      ])
      .sort({ createdAt: -1 });

    const total = await Prescription.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const fotmattedResults = prescriptions.map((prescription) => {
      return {
        _id: prescription._id,
        patient: prescription.patient.name,
        doctor: prescription.doctor.name,
        total: prescription.total,
        status: prescription.status,
        createdAt: prescription.createdAt,
        updatedAt: prescription.updatedAt,
      };
    });

    return res.status(200).json({
      results: fotmattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi trong controller getAllPrescriptions", error);
    return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const getPrescriptionDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findById(id)
      .populate([
        {
          path: "patient",
          select: "_id name",
        },
        {
          path: "doctor",
          select: "_id name",
        },
        {
          path: "detail.medicine",
          select: "_id name unit price category",
          populate: {
            path: "category",
            select: "_id name",
          },
        },
      ])
      .sort({ createdAt: -1 });

    // Format lại phần detail
    const formattedDetail = prescription.detail.map((item) => ({
      _id: item.medicine._id,
      name: item.medicine.name,
      price: item.medicine.price,
      unit: item.medicine.unit,
      categoryId: item.medicine.category._id,
      category: item.medicine.category.name,
      quantity: item.quantity,
    }));

    const formattedPrescription = {
      _id: prescription._id,
      patient: prescription.patient,
      doctor: prescription.doctor,
      detail: formattedDetail,
      notes: prescription.notes,
      total: prescription.total,
      status: prescription.status,
      createdAt: prescription.createdAt,
      updatedAt: prescription.updatedAt,
    };

    return res.status(200).json(formattedPrescription);
  } catch (error) {
    console.log("Lỗi trong controller getPrescriptionDetail", error);
    return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const data = await Prescription.find({ status: PAYMENT_STATUS.PAID });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in getCollection controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
