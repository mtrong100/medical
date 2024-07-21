import Appointment from "../models/appointmentModel.js";
import Employee from "../models/employeeModel.js";
import Invoice from "../models/invoiceModel.js";
import MedicalServiceInvoice from "../models/medicalServiceInvoiceModel.js";
import Patient from "../models/patientModel.js";
import Prescription from "../models/prescriptionModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";
import { getMonthName, getMonthYear } from "../utils/helper.js";

export const getRevenue = async (req, res) => {
  try {
    const invoiceData = await Invoice.find({
      paymentStatus: PAYMENT_STATUS.PAID,
    });

    const medicalServiceInvoiceData = await MedicalServiceInvoice.find({
      status: PAYMENT_STATUS.PAID,
    });

    const prescriptionData = await Prescription.find({
      status: PAYMENT_STATUS.PAID,
    });

    // Helper function to accumulate total revenue
    const accumulateTotalRevenue = (data) => {
      return data.reduce((acc, item) => acc + item.total, 0);
    };

    // Calculate total revenue for each type
    const totalInvoiceRevenue = accumulateTotalRevenue(invoiceData);
    const totalMedicalServiceInvoiceRevenue = accumulateTotalRevenue(
      medicalServiceInvoiceData
    );
    const totalPrescriptionRevenue = accumulateTotalRevenue(prescriptionData);

    // Calculate the overall total revenue
    const totalRevenue =
      totalInvoiceRevenue +
      totalMedicalServiceInvoiceRevenue +
      totalPrescriptionRevenue;

    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.log("Lỗi tại controller getRevenue", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getFigures = async (req, res) => {
  try {
    const employeeCount = await Employee.countDocuments();
    const patientCount = await Patient.countDocuments();
    const appointmentCount = await Appointment.countDocuments();

    return res
      .status(200)
      .json({ employeeCount, patientCount, appointmentCount });
  } catch (error) {
    console.log("Lỗi tại controller getFigures", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {
    // Fetch data for each collection
    const invoiceData = await Invoice.find({
      paymentStatus: PAYMENT_STATUS.PAID,
    });

    const medicalServiceInvoiceData = await MedicalServiceInvoice.find({
      status: PAYMENT_STATUS.PAID,
    });

    const prescriptionData = await Prescription.find({
      status: PAYMENT_STATUS.PAID,
    });

    const monthlyRevenue = {};

    // Helper function to accumulate revenue
    const accumulateRevenue = (data) => {
      data.forEach((item) => {
        const monthName = getMonthName(new Date(item.createdAt)); // assuming createdAt is a date string
        if (!monthlyRevenue[monthName]) {
          monthlyRevenue[monthName] = 0;
        }
        monthlyRevenue[monthName] += item.total;
      });
    };

    // Calculate revenue for each type and accumulate it
    accumulateRevenue(invoiceData);
    accumulateRevenue(medicalServiceInvoiceData);
    accumulateRevenue(prescriptionData);

    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format the result as an array of objects
    const result = allMonths.map((month) => ({
      month,
      revenue: monthlyRevenue[month] || 0,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi tại controller getMonthlyRevenue", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
