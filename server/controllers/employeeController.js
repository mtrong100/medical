import Employee from "../models/employeeModel.js";
import { sendTerminationEmail } from "../utils/mail.js";
import { EMPLOYEE_STATUS } from "../utils/constanst.js";
import {
  generateTokenAndSetCookie,
  getEmployeeSalary,
} from "../utils/helper.js";

export const employeeLogin = async (req, res) => {
  const { employeeId } = req.body;

  try {
    const account = await Employee.findById(employeeId);

    if (!account) {
      return res.status(400).json({ message: "Không tìm thấy tài khoản" });
    }

    const payload = { userId: account._id };

    generateTokenAndSetCookie(payload, res);

    return res.status(200).json(account);
  } catch (error) {
    console.log("Lỗi tại controller employeeLogin", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createEmployee = async (req, res) => {
  const { role, salary, ...data } = req.body;

  try {
    const employeeSalary = getEmployeeSalary(role);

    const newEmployee = new Employee({
      ...data,
      salary: employeeSalary,
      role,
    });

    await newEmployee.save();

    return res.status(201).json(newEmployee);
  } catch (error) {
    console.log("Lỗi tại controller createEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log("Lỗi tại controller updateEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const terminatedEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, reason } = req.body;

  try {
    await Employee.findByIdAndUpdate(
      id,
      { $set: { status: EMPLOYEE_STATUS.ISFIRED } },
      { new: true }
    );

    sendTerminationEmail(name, email, reason);

    return res.status(200).json({ message: "Gửi email sa thải hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller terminatedEmployee", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getEmployeeDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ message: "Không tìm thấy nhân viên" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log("Lỗi tại controller getEmployeeDetail", error);
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
    const query = {};

    if (graduatedFrom) query.graduatedFrom = graduatedFrom;
    if (specialization) query.specialization = specialization;
    if (gender) query.gender = gender;
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Employee.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const employees = await Employee.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      results: employees,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Lỗi tại controller getEmployees", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getCollection = async (req, res) => {
  try {
    const data = await Employee.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi tại controller getCollection", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
