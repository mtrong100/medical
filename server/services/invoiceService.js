import Employee from "../models/employeeModel.js";
import Invoice from "../models/invoiceModel.js";
import Patient from "../models/patientModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const getInvoiceCollectionService = async () => {
  try {
    const data = await Invoice.find({ paymentStatus: PAYMENT_STATUS.PAID });

    if (!data || data.length === 0) {
      throw new Error("Không tìm thấy hoá đơn");
    }

    return data;
  } catch (error) {
    console.log("Lỗi tại service getInvoiceCollectionService", error);
    throw new Error(error.message);
  }
};

export const getInvoicesService = async ({ page, limit }) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Invoice.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const invoices = await Invoice.find()
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        {
          path: "patient",
          select: "_id name email",
        },
        {
          path: "doctor",
          select: "_id name email",
        },
      ])
      .sort({ createdAt: -1 });

    const formattedResults = invoices.map((invoice) => ({
      _id: invoice._id,
      patient: invoice.patient.name,
      doctor: invoice.doctor.name,
      price: invoice.price,
      healthInsurance: invoice.healthInsurance,
      total: invoice.total,
      paymentStatus: invoice.paymentStatus,
      createdAt: invoice.createdAt,
    }));

    return {
      results: formattedResults,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getInvoices", error);
    throw error;
  }
};

export const getInvoiceDetailService = async (id) => {
  try {
    const invoice = await Invoice.findById(id).populate([
      {
        path: "patient",
        select: "_id name email",
      },
      {
        path: "doctor",
        select: "_id name email",
      },
    ]);

    if (!invoice) {
      throw new Error("Không tìm thấy hóa đơn");
    }

    return {
      _id: invoice._id,
      patient: invoice.patient.name,
      patientId: invoice.patient._id,
      doctor: invoice.doctor.name,
      doctorId: invoice.doctor._id,
      price: invoice.price,
      healthInsurance: invoice.healthInsurance,
      total: invoice.total,
      paymentStatus: invoice.paymentStatus,
      createdAt: invoice.createdAt,
    };
  } catch (error) {
    console.log("Error in getInvoiceDetail service", error);
    throw error;
  }
};

export const createInvoiceService = async ({
  patientId,
  doctorId,
  price,
  healthInsurance,
}) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Không tìm thấy thông tin bệnh nhân");
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      throw new Error("Không tìm thấy thông tin bác sĩ");
    }

    // Calculate totalAmount
    let totalAmount = price;
    if (healthInsurance) {
      totalAmount *= 0.5;
    }

    // Create new invoice
    const newInvoice = new Invoice({
      patient: patientId,
      doctor: doctorId,
      price,
      healthInsurance,
      total: totalAmount,
    });

    // Save the new invoice
    await newInvoice.save();

    return newInvoice;
  } catch (error) {
    console.log("Lỗi tại service createInvoiceService", error);
    throw new Error(error.message);
  }
};

export const updateInvoiceService = async ({
  id,
  patientId,
  doctorId,
  price,
  healthInsurance,
  paymentStatus,
}) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("Không tìm thấy thông tin bệnh nhân");
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      throw new Error("Không tìm thấy thông tin bác sĩ");
    }

    // Calculate totalAmount
    let totalAmount = price;
    if (healthInsurance) {
      totalAmount *= 0.5;
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        patient: patientId,
        doctor: doctorId,
        price,
        healthInsurance,
        total: totalAmount,
        paymentStatus,
      },
      { new: true }
    );

    if (!updatedInvoice) {
      throw new Error("Không tìm thấy hóa đơn");
    }

    return updatedInvoice;
  } catch (error) {
    console.log("Lỗi tại service updateInvoice", error);
    throw new Error(error.message);
  }
};

export const deleteInvoiceService = async (id) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      throw new Error("Không tìm thấy hóa đơn");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteInvoice", error);
    throw new Error(error.message);
  }
};
