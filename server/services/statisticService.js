import Appointment from "../models/appointmentModel.js";
import Employee from "../models/employeeModel.js";
import Inventory from "../models/inventoryModel.js";
import Invoice from "../models/invoiceModel.js";
import MedicalRecord from "../models/medicalRecordModel.js";
import MedicalServiceInvoice from "../models/medicalServiceInvoiceModel.js";
import Medicine from "../models/medicineModel.js";
import Patient from "../models/patientModel.js";
import Prescription from "../models/prescriptionModel.js";
import { PAYMENT_STATUS } from "../utils/constanst.js";
import { accumulateValues } from "../utils/helper.js";

export const calculateTotalRevenueService = async () => {
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

    return totalRevenue;
  } catch (error) {
    throw new Error("Lỗi khi tính toán doanh thu");
  }
};

export const calculateFiguresService = async () => {
  try {
    const [
      employeeCount,
      patientCount,
      appointmentCount,
      medicalRecordCount,
      medicineCount,
      prescriptionCount,
      invoiceCount,
    ] = await Promise.all([
      Employee.countDocuments(),
      Patient.countDocuments(),
      Appointment.countDocuments(),
      MedicalRecord.countDocuments(),
      Medicine.countDocuments(),
      Prescription.countDocuments(),
      Invoice.countDocuments(),
    ]);

    return {
      employeeCount,
      patientCount,
      appointmentCount,
      medicalRecordCount,
      medicineCount,
      prescriptionCount,
      invoiceCount,
    };
  } catch (error) {
    throw new Error("Lỗi khi tính toán số liệu");
  }
};

export const getMonthlyRevenueAndExpenseService = async () => {
  try {
    // Fetch revenue-related data
    const [invoiceData, medicalServiceInvoiceData, prescriptionData] =
      await Promise.all([
        Invoice.find({ paymentStatus: PAYMENT_STATUS.PAID }),
        MedicalServiceInvoice.find({ status: PAYMENT_STATUS.PAID }),
        Prescription.find({ status: PAYMENT_STATUS.PAID }),
      ]);

    // Fetch expense-related data
    const inventoryData = await Inventory.find({ status: PAYMENT_STATUS.PAID });

    const monthlyRevenue = {};
    const monthlyExpense = {};

    // Calculate revenue for each type and accumulate it
    accumulateValues(invoiceData, monthlyRevenue);
    accumulateValues(medicalServiceInvoiceData, monthlyRevenue);
    accumulateValues(prescriptionData, monthlyRevenue);

    // Calculate expense for each type and accumulate it
    accumulateValues(inventoryData, monthlyExpense);

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

    return allMonths.map((month) => ({
      month,
      revenue: monthlyRevenue[month] || 0,
      expense: monthlyExpense[month] || 0,
    }));
  } catch (error) {
    console.log("Lỗi tại service getMonthlyRevenueAndExpenseService", error);
    throw new Error(error.message);
  }
};
