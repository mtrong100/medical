import Employee from "../models/employeeModel.js";
import Invoice from "../models/invoiceModel.js";
import Patient from "../models/patientModel.js";

export const createNewInvoice = async (req, res) => {
  const {
    patient: patientId,
    doctor: doctorId,
    room,
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
      room,
      price,
      healthInsurance,
      total: totalAmount,
    });

    // Save the new invoice
    await newInvoice.save();

    return res.status(201).json(newInvoice);
  } catch (error) {
    console.log("Error in createNewInvoice controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const {
    patient: patientId,
    doctor: doctorId,
    room,
    price,
    healthInsurance,
    status,
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
        room,
        price,
        healthInsurance,
        total: totalAmount,
        status,
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    console.log("Error in updateInvoice controller", error);
    return res.status(500).json({ error: "Internal server error" });
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
    console.log("Error in deleteInvoice controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
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

    return res.status(200).json(invoices);
  } catch (error) {
    console.log("Error in getAllInvoices controller", error);
    return res.status(500).json({ error: "Internal server error" });
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

    return res.status(200).json(invoice);
  } catch (error) {
    console.log("Error in getInvoiceDetail controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
