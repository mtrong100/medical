import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.MEDICAL_JWT;

    if (!token) {
      return res.status(401).json({ message: "Không có token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    if (user.isAdmin) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Không có quyền admin" });
    }
  } catch (error) {
    console.log("Lỗi tại middleware verifyAdmin: ", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
