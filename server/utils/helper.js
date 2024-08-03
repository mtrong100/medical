import { EMPLOYEE_ROLE, EMPLOYEE_SALARY } from "./constanst.js";
import jwt from "jsonwebtoken";

export const autoGeneratePassword = () => {
  const generatedPassword =
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

  return generatedPassword;
};

export const generateTokenAndSetCookie = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("MEDICAL_JWT", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

export const formatSalary = (salary) => {
  switch (salary) {
    case EMPLOYEE_SALARY.DOCTOR:
      return "13 triệu đồng";
    case EMPLOYEE_SALARY.CASHIER:
      return "8 triệu đồng";
    case EMPLOYEE_SALARY.RECEPTIONIST:
      return "8 triệu đồng";
    case EMPLOYEE_SALARY.NURSE:
      return "9 triệu đồng";
    case EMPLOYEE_SALARY.ACCOUNTANT:
      return "10 triệu đồng";
    case EMPLOYEE_SALARY.CLEANING_STAFF:
      return "6 triệu đồng";
    case EMPLOYEE_SALARY.GUARD:
      return "5 triệu đồng";
    default:
      return "Lương không xác định";
  }
};

export const getEmployeeSalary = (role) => {
  switch (role) {
    case EMPLOYEE_ROLE.DOCTOR:
      return EMPLOYEE_SALARY.DOCTOR;
    case EMPLOYEE_ROLE.CASHIER:
      return EMPLOYEE_SALARY.CASHIER;
    case EMPLOYEE_ROLE.RECEPTIONIST:
      return EMPLOYEE_SALARY.RECEPTIONIST;
    case EMPLOYEE_ROLE.NURSE:
      return EMPLOYEE_SALARY.NURSE;
    case EMPLOYEE_ROLE.ACCOUNTANT:
      return EMPLOYEE_SALARY.ACCOUNTANT;
    case EMPLOYEE_ROLE.CLEANING_STAFF:
      return EMPLOYEE_SALARY.CLEANING_STAFF;
    case EMPLOYEE_ROLE.GUARD:
      return EMPLOYEE_SALARY.GUARD;
    default:
      return 0;
  }
};

export const getMonthYear = (date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? "0" : ""}${month}`;
};

export const getMonthName = (date) => {
  const monthNames = [
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
  return monthNames[date.getMonth()];
};

export const accumulateValues = (data, accumulator) => {
  data.forEach((item) => {
    const monthName = getMonthName(new Date(item.createdAt));
    if (!accumulator[monthName]) {
      accumulator[monthName] = 0;
    }
    accumulator[monthName] += item.total;
  });
};
