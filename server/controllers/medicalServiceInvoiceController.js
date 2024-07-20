import MedicalServiceInvoice from "../models/medicalServiceInvoiceModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const createMedicalServiceInvoice = async (req, res) => {
  try {
    const newMedicalServiceInvoice = new MedicalServiceInvoice(req.body);
    await newMedicalServiceInvoice.save();
    return res.status(201).json(newMedicalServiceInvoice);
  } catch (error) {
    console.log("Lỗi tại controller createMedicalServiceInvoice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateMedicalServiceInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const medicalServiceInvoice = await MedicalServiceInvoice.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(medicalServiceInvoice);
  } catch (error) {
    console.log("Lỗi tại controller updateMedicalServiceInvoice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteMedicalServiceInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    await MedicalServiceInvoice.findByIdAndDelete(id);
    res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteMedicalServiceInvoice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicalServiceInvoiceDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const medicalServiceInvoice = await MedicalServiceInvoice.findById(id)
      .populate([
        { path: "patient", select: "_id name" },
        { path: "detail.service", select: "_id name price" },
      ])
      .sort({ createdAt: -1 });

    // Format lại phần detail
    const formattedDetail = medicalServiceInvoice.detail.map((item) => ({
      _id: item.service._id,
      name: item.service.name,
      price: item.service.price,
    }));

    const formattedResults = {
      _id: medicalServiceInvoice._id,
      patient: medicalServiceInvoice.patient.name,
      patientId: medicalServiceInvoice.patient._id,
      detail: formattedDetail,
      total: medicalServiceInvoice.total,
      status: medicalServiceInvoice.status,
      createdAt: medicalServiceInvoice.createdAt,
      updatedAt: medicalServiceInvoice.updatedAt,
    };

    return res.status(200).json(formattedResults);
  } catch (error) {
    console.log("Lỗi tại controller getMedicalServiceInvoiceDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMedicalServiceInvoices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const total = await MedicalServiceInvoice.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const medicalServiceInvoices = await MedicalServiceInvoice.find()
      .skip(skip)
      .limit(limit)
      .populate([
        { path: "patient", select: "_id name" },
        { path: "detail.service", select: "_id name price" },
      ])
      .sort({ createdAt: -1 });

    const formattedResults = medicalServiceInvoices.map((item) => {
      const formattedDetails = item.detail.map((detailItem) => {
        return {
          serviceId: detailItem.service._id,
          name: detailItem.service.name,
          price: detailItem.service.price,
        };
      });

      return {
        _id: item._id,
        patient: item.patient.name,
        total: item.total,
        status: item.status,
        detail: formattedDetails,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

    return res.status(200).json({
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getMedicalServiceInvoices", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const data = await MedicalServiceInvoice.find({
      status: PAYMENT_STATUS.PAID,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
