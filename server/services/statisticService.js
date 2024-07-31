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
import { getMonthName } from "../utils/helper.js";

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

export const getMonthlyRevenueService = async () => {
  try {
    // Fetch data for each collection
    const [invoiceData, medicalServiceInvoiceData, prescriptionData] =
      await Promise.all([
        Invoice.find({ paymentStatus: PAYMENT_STATUS.PAID }),
        MedicalServiceInvoice.find({ status: PAYMENT_STATUS.PAID }),
        Prescription.find({ status: PAYMENT_STATUS.PAID }),
      ]);

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
    return allMonths.map((month) => ({
      month,
      revenue: monthlyRevenue[month] || 0,
    }));
  } catch (error) {
    console.log("Lỗi tại service getMonthlyRevenue", error);
    throw new Error(error.message);
  }
};

export const caculateExpenseInventoryService = async () => {
  try {
    const inventoryData = await Inventory.find({ status: PAYMENT_STATUS.PAID });

    const monthlyRevenue = {};

    // Helper function to accumulate revenue
    const accumulateRevenue = (data) => {
      data.forEach((item) => {
        const monthName = getMonthName(new Date(item.createdAt));
        if (!monthlyRevenue[monthName]) {
          monthlyRevenue[monthName] = 0;
        }
        monthlyRevenue[monthName] += item.total;
      });
    };

    accumulateRevenue(inventoryData);

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
    return allMonths.map((month) => ({
      month,
      expense: monthlyRevenue[month] || 0,
    }));
  } catch (error) {
    console.log("Lỗi tại service caculateExpenseInventoryService", error);
    throw new Error(error.message);
  }
};
  