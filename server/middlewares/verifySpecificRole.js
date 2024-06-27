import jwt from "jsonwebtoken";
import { EMPLOYEE_ROLE } from "../utils/constanst.js";

export const verifySpecificRole = async (req, res, next) => {
  try {
    const token = req.cookies.MEDICAL_JWT;

    if (!token) {
      return res.status(401).json({ message: "Không có token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }

    if (decoded.userRole === EMPLOYEE_ROLE.ADMIN) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Không có quyền thực hiện thao tác này" });
    }
  } catch (error) {
    console.log("Error in verifySpecificRole middleware: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
