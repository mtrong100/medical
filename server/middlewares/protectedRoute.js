import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.MEDICAL_JWT;

    if (!token) {
      return res.status(401).json({ error: "Không có token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
