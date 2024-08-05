import Employee from "../models/employeeModel.js";
import { EMPLOYEE_STATUS } from "../utils/constanst.js";
import { getEmployeeSalary } from "../utils/helper.js";
import { sendTerminationEmail } from "../utils/mail.js";

export const getEmployeeCollectionService = async () => {
  try {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      throw new Error("Không tìm thấy collection nhân viên");
    }

    return employees;
  } catch (error) {
    console.log("Lỗi tại service getEmployeeCollectionService", error);
    throw new Error(error.message);
  }
};

export const getEmployeesService = async ({
  page,
  limit,
  graduatedFrom,
  specialization,
  gender,
  role,
  status,
}) => {
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

    return {
      results: employees,
      totalResults: total,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  } catch (error) {
    console.log("Lỗi tại service getEmployeesService", error);
    throw new Error(error.message);
  }
};

export const getEmployeeDetailService = async (id) => {
  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      throw new Error("Không tìm thấy nhân viên");
    }

    return employee;
  } catch (error) {
    console.log("Lỗi tại service getEmployeeDetailService", error);
    throw new Error(error.message);
  }
};

export const getEmployeeStatsService = async () => {
  try {
    // Aggregate for roles and average salary
    const roleStats = await Employee.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
          averageSalary: { $avg: "$salary" },
        },
      },
    ]);

    // Aggregate for gender
    const genderStats = await Employee.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    // Extract roles, counts, and average salaries
    const roles = roleStats.map((stat) => stat._id);
    const employeeCountsByRole = roleStats.map((stat) => stat.count);
    const averageSalariesByRole = roleStats.map((stat) => stat.averageSalary);

    // Extract genders and counts
    const genders = genderStats.map((stat) => stat._id);
    const employeeCountsByGender = genderStats.map((stat) => stat.count);

    return {
      roles,
      employeeCountsByRole,
      averageSalariesByRole,
      genders,
      employeeCountsByGender,
    };
  } catch (error) {
    console.log("Lỗi tại service getEmployeeStatsService", error);
    throw new Error(error.message);
  }
};

export const createEmployeeService = async (data) => {
  const { role, salary, ...rest } = data;

  try {
    const employeeSalary = getEmployeeSalary(role);

    const newEmployee = new Employee({
      ...rest,
      salary: employeeSalary,
      role,
    });

    await newEmployee.save();
    return newEmployee;
  } catch (error) {
    console.log("Lỗi tại service createEmployeeService", error);
    throw new Error(error.message);
  }
};

export const updateEmployeeService = async (id, data) => {
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!employee) {
      throw new Error("Không tìm thấy nhân viên");
    }

    return employee;
  } catch (error) {
    console.log("Lỗi tại service updateEmployeeService", error);
    throw new Error(error.message);
  }
};

export const terminatedEmployeeService = async (id, data) => {
  const { name, email, reason } = data;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: { status: EMPLOYEE_STATUS.ISFIRED } },
      { new: true }
    );

    if (!employee) {
      throw new Error("Không tìm thấy nhân viên");
    }

    sendTerminationEmail(name, email, reason);
  } catch (error) {
    console.log("Lỗi tại service terminatedEmployeeService", error);
    throw new Error(error.message);
  }
};

export const deleteEmployeeService = async (id) => {
  try {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      throw new Error("Không tìm thấy nhân viên");
    }
  } catch (error) {
    console.log("Lỗi tại service deleteEmployeeService", error);
    throw new Error(error.message);
  }
};
