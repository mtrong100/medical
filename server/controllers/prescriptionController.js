import Medicine from "../models/medicineModel.js";
import Prescription from "../models/prescriptionModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const createPrescription = async (req, res) => {
  const { detail } = req.body;

  try {
    for (const item of detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res
          .status(404)
          .json({ message: `Thuốc với ID ${item.medicine} không tồn tại` });
      }

      if (medicine.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Không đủ số lượng cho thuốc ${medicine.name}` });
      }

      medicine.stock -= item.quantity;
      await medicine.save();
    }

    const newPrescription = new Prescription(req.body);
    await newPrescription.save();

    return res.status(201).json(newPrescription);
  } catch (error) {
    console.log("Lỗi tại controller createPrescription", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { detail, ...otherFields } = req.body;

  try {
    const existingPrescription = await Prescription.findById(id);
    if (!existingPrescription) {
      return res.status(404).json({ message: "Đơn thuốc không tồn tại" });
    }

    for (const item of existingPrescription.detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (medicine) {
        medicine.stock += item.quantity;
        await medicine.save();
      }
    }

    for (const item of detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res
          .status(404)
          .json({ message: `Thuốc với ID ${item.medicine} không tồn tại` });
      }

      if (medicine.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Không đủ số lượng cho thuốc ${medicine.name}` });
      }

      medicine.stock -= item.quantity;
      await medicine.save();
    }

    const updatedPrescription = await Prescription.findByIdAndUpdate(
      id,
      { ...otherFields, detail },
      { new: true }
    );

    return res.status(200).json(updatedPrescription);
  } catch (error) {
    console.log("Lỗi tại controller updatePrescription", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ message: "Đơn thuốc không tồn tại" });
    }

    await Prescription.findByIdAndDelete(id);

    return res.status(200).json({ message: "Xóa đơn thuốc thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deletePrescription", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getPrescriptions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await Prescription.countDocuments();
    const totalPages = Math.ceil(total / limit);

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
      ])
      .sort({ createdAt: -1 });

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
    console.log("Lỗi tại controller getPrescriptions", error);
    return res.status(500).json({ message: "Lỗi server" });
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
      quantity: item.quantity,
    }));

    const formattedPrescription = {
      _id: prescription._id,
      patientId: prescription.patient._id,
      patient: prescription.patient.name,
      doctorId: prescription.doctor._id,
      doctor: prescription.doctor.name,
      detail: formattedDetail,
      notes: prescription.notes,
      total: prescription.total,
      status: prescription.status,
      createdAt: prescription.createdAt,
      updatedAt: prescription.updatedAt,
    };

    return res.status(200).json(formattedPrescription);
  } catch (error) {
    console.log("Lỗi tại controller getPrescriptionDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const data = await Prescription.find({ status: PAYMENT_STATUS.PAID });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
