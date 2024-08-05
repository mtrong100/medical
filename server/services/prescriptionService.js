import Employee from "../models/employeeModel.js";
import Medicine from "../models/medicineModel.js";
import Prescription from "../models/prescriptionModel.js";
import { EMPLOYEE_ROLE, PAYMENT_STATUS } from "../utils/constanst.js";

export const getPrescriptionCollectionService = async () => {
  try {
    const data = await Prescription.find({ status: PAYMENT_STATUS.PAID });

    if (!data || data.length === 0) {
      throw new Error("Không tìm thấy đơn thuốc");
    }

    return data;
  } catch (error) {
    console.log("Lỗi tại service getPrescriptionCollectionService", error);
    throw new Error(error.message);
  }
};

export const getPrescriptionsService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Prescription.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const prescriptions = await Prescription.find()
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        { path: "patient", select: "_id name" },
        { path: "doctor", select: "_id name" },
      ])
      .sort({ createdAt: -1 });

    const formattedResults = prescriptions.map((prescription) => ({
      _id: prescription._id,
      patient: prescription.patient.name,
      doctor: prescription.doctor.name,
      total: prescription.total,
      status: prescription.status,
      createdAt: prescription.createdAt,
      updatedAt: prescription.updatedAt,
    }));

    return {
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getPrescriptionsService", error);
    throw new Error(error.message);
  }
};

export const getPrescriptionDetailService = async (id) => {
  try {
    const prescription = await Prescription.findById(id)
      .populate([
        { path: "patient", select: "_id name" },
        { path: "doctor", select: "_id name" },
        {
          path: "detail.medicine",
          select: "_id name unit price category",
          populate: { path: "category", select: "_id name" },
        },
      ])
      .sort({ createdAt: -1 });

    if (!prescription) {
      throw new Error("Đơn thuốc không tồn tại");
    }

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

    return formattedPrescription;
  } catch (error) {
    console.log("Lỗi tại service getPrescriptionDetailService", error);
    throw new Error(error.message);
  }
};

export const getPrescriptionStatsService = async () => {
  try {
    const doctors = await Employee.find({ role: EMPLOYEE_ROLE.DOCTOR });
    const paidPrescription = await Prescription.countDocuments({
      status: PAYMENT_STATUS.PAID,
    });

    const unPaidPrescription = await Prescription.countDocuments({
      status: PAYMENT_STATUS.UNPAID,
    });

    const prescriptionCount = [];

    for (const doc of doctors) {
      const prescriptionByDoctor = await Prescription.countDocuments({
        doctor: doc._id,
        status: PAYMENT_STATUS.PAID,
      });

      prescriptionCount.push(prescriptionByDoctor);
    }

    const results = {
      doctors,
      prescriptionCount,
      paidPrescription,
      unPaidPrescription,
    };

    return results;
  } catch (error) {
    console.log("Lỗi tại service getPrescriptionStatsService", error);
    throw new Error(error.message);
  }
};

export const createPrescriptionService = async (prescriptionData) => {
  const { detail } = prescriptionData;

  try {
    // Validate and update medicine stock
    for (const item of detail) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        throw new Error(`Thuốc với ID ${item.medicine} không tồn tại`);
      }

      if (medicine.stock < item.quantity) {
        throw new Error(`Không đủ số lượng cho thuốc ${medicine.name}`);
      }

      medicine.stock -= item.quantity;
      await medicine.save();
    }

    // Create and save new prescription
    const newPrescription = new Prescription(prescriptionData);
    await newPrescription.save();

    return newPrescription;
  } catch (error) {
    console.log("Lỗi tại service createPrescriptionService", error);
    throw new Error(error.message);
  }
};

export const deletePrescriptionService = async (id) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(id);
    if (!prescription) {
      throw new Error("Không tìm thấy đơn thuốc");
    }
  } catch (error) {
    console.log("Lỗi tại service deletePrescriptionService", error);
    throw new Error(error.message);
  }
};
