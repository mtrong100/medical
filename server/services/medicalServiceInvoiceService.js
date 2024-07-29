import MedicalServiceInvoice from "../models/medicalServiceInvoiceModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const getMedicalServiceInvoiceCollectionService = async () => {
  try {
    const data = await MedicalServiceInvoice.find({
      status: PAYMENT_STATUS.PAID,
    });

    if (!data || data.length === 0) {
      throw new Error("Không tìm thấy hóa đơn dịch vụ");
    }

    return data;
  } catch (error) {
    console.log(
      "Lỗi tại service getMedicalServiceInvoiceCollectionService",
      error
    );
    throw new Error(error.message);
  }
};

export const getMedicalServiceInvoicesService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const total = await MedicalServiceInvoice.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const medicalServiceInvoices = await MedicalServiceInvoice.find()
      .skip(skip)
      .limit(parseInt(limit))
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

    return {
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getMedicalServiceInvoicesService", error);
    throw new Error("Lỗi server");
  }
};

export const getMedicalServiceInvoiceDetailService = async (id) => {
  try {
    const medicalServiceInvoice = await MedicalServiceInvoice.findById(id)
      .populate([
        { path: "patient", select: "_id name" },
        { path: "detail.service", select: "_id name price" },
      ])
      .sort({ createdAt: -1 });

    if (!medicalServiceInvoice) {
      throw new Error("Không tìm thấy hóa đơn dịch vụ y tế");
    }

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

    return formattedResults;
  } catch (error) {
    console.log("Lỗi tại service getMedicalServiceInvoiceDetailService", error);
    throw new Error(error.message);
  }
};

export const createMedicalServiceInvoiceService = async (data) => {
  try {
    const medicalServiceInvoice = new MedicalServiceInvoice(data);

    await medicalServiceInvoice.save();

    return medicalServiceInvoice;
  } catch (error) {
    console.log("Lỗi tại service createMedicalServiceInvoiceService", error);
    throw new Error(error.message);
  }
};

export const updateMedicalServiceInvoiceService = async (id, data) => {
  try {
    const medicalServiceInvoice = await MedicalServiceInvoice.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!medicalServiceInvoice) {
      throw new Error("Không tìm thấy hóa đơn dịch vụ");
    }

    return medicalServiceInvoice;
  } catch (error) {
    console.log("Lỗi tại service updateMedicalServiceInvoiceService", error);
    throw new Error(error.message);
  }
};

export const deleteMedicalServiceInvoiceService = async (id) => {
  try {
    const deletedData = await MedicalServiceInvoice.findByIdAndDelete(id);

    if (!deletedData) {
      throw new Error("Không tìm thấy hóa đơn dịch vụ");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteMedicalServiceInvoiceService", error);
    throw new Error(error.message);
  }
};
