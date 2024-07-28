import mongoose from "mongoose";
import {
  createEmployeeService,
  deleteEmployeeService,
  getEmployeeCollectionService,
  getEmployeeDetailService,
  getEmployeesService,
  terminatedEmployeeService,
  updateEmployeeService,
} from "../services/employeeService.js";

export const getEmployeeCollection = async (req, res) => {
  try {
    const data = await getEmployeeCollectionService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getEmployees = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    graduatedFrom,
    specialization,
    gender,
    role,
    status,
  } = req.query;

  try {
    const results = await getEmployeesService({
      page,
      limit,
      graduatedFrom,
      specialization,
      gender,
      role,
      status,
    });
    return res.status(200).json(results);
  } catch (error) {
    console.log("Lỗi tại controller getEmployees", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getEmployeeDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const employee = await getEmployeeDetailService(id);

    return res.status(200).json(employee);
  } catch (error) {
    console.log("Lỗi tại controller getEmployeeDetail", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = await createEmployeeService(req.body);
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.log("Lỗi tại controller createEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedEmployee = await updateEmployeeService(id, req.body);
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log("Lỗi tại controller updateEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteEmployeeService(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const terminatedEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await terminatedEmployeeService(id, req.body);
    return res.status(200).json({ message: "Gửi email sa thải hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller terminatedEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
