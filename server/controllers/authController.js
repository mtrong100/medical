import { generateTokenAndSetCookie } from "../utils/helper.js";
import {
  googleLoginUserService,
  loginUserService,
  registerUserService,
} from "../services/authService.js";

export const register = async (req, res) => {
  try {
    await registerUserService(req.body);

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
    });
  } catch (error) {
    console.log("Lỗi tại controller register", error);
    return res.status(500).json({ message: error.message || "Lỗi server" });
  }
};

export const login = async (req, res) => {
  try {
    const { payload, user } = await loginUserService(req.body);

    generateTokenAndSetCookie(payload, res);

    return res.status(200).json(user);
  } catch (error) {
    console.log("Lỗi tại controller login", error);
    return res.status(500).json({ message: error.message || "Lỗi server" });
  }
};

export const googleLogin = async (req, res) => {
  const { email, name, avatar } = req.body;

  try {
    const { payload, user } = await googleLoginUserService({
      email,
      name,
      avatar,
    });

    generateTokenAndSetCookie(payload, res);

    return res.status(200).json(user);
  } catch (error) {
    console.log("Lỗi", error);
    return res.status(500).json({ error: error.message || "Lỗi server" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("MEDICAL_JWT", "", { maxAge: 0 });
    return res.status(200).json({ message: "Đã đăng xuất tài khoản" });
  } catch (error) {
    console.log("Lỗi tại controller logout", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
