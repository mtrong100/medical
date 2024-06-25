import jwt from "jsonwebtoken";
import Employee from "../models/employeeModel.js";

export const protectedEmployee = async (req, res, next) => {
  try {
    const token = req.cookies.MEDICAL_JWT;

    if (!token) {
      return res.status(401).json({ message: "Không có token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }

    const employee = await Employee.findById(decoded.userId);

    if (!employee) {
      return res.status(404).json({ error: "Không tìm thấy nhân viên" });
    }

    req.employee = employee;

    next();
  } catch (error) {
    console.log("Error in protectedEmployee middleware: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
