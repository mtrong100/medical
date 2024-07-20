import Employee from "../models/employeeModel.js";
import Invoice from "../models/invoiceModel.js";
import Patient from "../models/patientModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";

export const createInvoice = async (req, res) => {
  const {
    patient: patientId,
    doctor: doctorId,
    price,
    healthInsurance,
  } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bệnh nhân" });
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bác sĩ" });
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

    return res.status(201).json(newInvoice);
  } catch (error) {
    console.log("Lỗi tại controller createInvoice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const {
    patient: patientId,
    doctor: doctorId,
    price,
    healthInsurance,
    paymentStatus,
  } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bệnh nhân" });
    }

    const doctor = await Employee.findById(doctorId);
    if (!doctor) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin bác sĩ" });
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
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    console.log("Lỗi tại controller updateInvoice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    return res.status(200).json({ message: "Xóa hóa đơn thành công" });
  } catch (error) {
    console.log("Lỗi tại controller deleteInvoice", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getInvoices = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

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

    const formattedResults = invoices.map((invoice) => {
      return {
        _id: invoice._id,
        patient: invoice.patient.name,
        doctor: invoice.doctor.name,
        price: invoice.price,
        healthInsurance: invoice.healthInsurance,
        total: invoice.total,
        paymentStatus: invoice.paymentStatus,
        createdAt: invoice.createdAt,
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
    console.log("Lỗi tại controller getInvoices", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getInvoiceDetail = async (req, res) => {
  const { id } = req.params;

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
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    const results = {
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

    return res.status(200).json(results);
  } catch (error) {
    console.log("Error in getInvoiceDetail controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const data = await Invoice.find({ paymentStatus: PAYMENT_STATUS.PAID });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error in getCollection controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
