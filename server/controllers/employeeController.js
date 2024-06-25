import Employee from "../models/employeeModel.js";
import {
  generateTokenAndSetCookie,
  getAvatarUrl,
  getEmployeeSalary,
} from "../utils/helper.js";
import bcrypt from "bcrypt";
import { sendTerminationEmail } from "../utils/mail.js";
import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from "../utils/constanst.js";

export const employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Employee.findOne({ email });

    if (account.status === EMPLOYEE_STATUS.ISLOCKED) {
      return res.status(400).json({ error: "Tài khoản đã bị khóa" });
    }

    if (account.isDeleted) {
      return res.status(400).json({ error: "Tài khoản đã bị xóa" });
    }

    if (!account) {
      return res.status(400).json({ error: "Không tìm thấy tài khoản" });
    }

    const validPassword = bcrypt.compareSync(password, account.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    const payload = { userId: account._id, userRole: account.role };

    generateTokenAndSetCookie(payload, res);

    return res.status(200).json(account);
  } catch (error) {
    console.log("Error in employeeLogin controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createNewEmployee = async (req, res) => {
  const { role, gender, password, avatar, salary, ...data } = req.body;
  const employeeRole = req.employee.role;

  if (employeeRole !== EMPLOYEE_ROLE.ADMIN) {
    return res
      .status(400)
      .json({ error: "Không có quyền thực hiện thao tác này" });
  }

  try {
    const avatarUrl = getAvatarUrl(role, gender);
    const employeeSalary = getEmployeeSalary(role);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newEmployee = new Employee({
      ...data,
      gender,
      avatar: avatarUrl,
      salary: employeeSalary,
      password: hash,
    });

    await newEmployee.save();

    return res.status(201).json(newEmployee);
  } catch (error) {
    console.log("Error in createNewEmployee controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { password, confirmPassword, ...data } = req.body;
  const employeeRole = req.employee.role;

  if (employeeRole !== EMPLOYEE_ROLE.ADMIN) {
    return res
      .status(400)
      .json({ error: "Không có quyền thực hiện thao tác này" });
  }

  try {
    // Check case if update password
    if (password && confirmPassword) {
      const account = await Employee.findById(id);

      if (!account) {
        return res.status(404).json({ error: "Không tìm thấy tài khoản" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      account.password = hashedPassword;

      return res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log("Error in updateEmployee controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const employeeRole = req.employee.role;

  if (employeeRole !== EMPLOYEE_ROLE.ADMIN) {
    return res
      .status(400)
      .json({ error: "Không có quyền thực hiện thao tác này" });
  }

  try {
    await Employee.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } },
      { new: true }
    );

    return res.status(200).json({ message: "Xóa hoàn tất" });
  } catch (error) {
    console.log("Error in deleteEmployee controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const terminatedEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, reason } = req.body;
  const employeeRole = req.employee.role;

  if (employeeRole !== EMPLOYEE_ROLE.ADMIN) {
    return res
      .status(400)
      .json({ error: "Không có quyền thực hiện thao tác này" });
  }

  try {
    await Employee.findByIdAndUpdate(
      id,
      { $set: { status: EMPLOYEE_STATUS.ISFIRED } },
      { new: true }
    );

    sendTerminationEmail(name, email, reason);

    return res.status(200).json({ message: "Gửi email hoàn tất" });
  } catch (error) {
    console.log("Error in terminatedEmployee controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const lockEmployeeAccount = async (req, res) => {
  const { id } = req.params;
  const employeeRole = req.employee.role;

  if (employeeRole !== EMPLOYEE_ROLE.ADMIN) {
    return res
      .status(400)
      .json({ error: "Không có quyền thực hiện thao tác này" });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: { status: EMPLOYEE_STATUS.ISLOCKED } },
      { new: true }
    );

    return res.status(200).json({
      message: "Khóa tài khoản hoàn tất",
      status: updatedEmployee.status,
    });
  } catch (error) {
    console.log("Error in lockEmployeeAccount controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployeeDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ error: "Không tìm thấy nhân viên" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log("Error in getEmployeeDetail controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEmployees = async (req, res) => {
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
    const query = { isDeleted: false };

    if (graduatedFrom) query.graduatedFrom = graduatedFrom;
    if (specialization) query.specialization = specialization;
    if (gender) query.gender = gender;
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const employees = await Employee.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Employee.countDocuments(query);

    return res.status(200).json({
      employees,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.log("Error in getAllEmployees controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
