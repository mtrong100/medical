import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  autoGeneratePassword,
  generateTokenAndSetCookie,
} from "../utils/helper.js";
import { sendOtpResetPassword } from "../utils/mail.js";

export const register = async (req, res) => {
  const { email, password, name, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Tài khoản đã tồn tại" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      provider: "email & password",
      password: hash,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
    });
  } catch (error) {
    console.log("Lỗi", error.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user.blocked) {
      return res.status(400).json({ error: "Tài khoản của bạn đã bị khóa" });
    }

    if (!user) {
      return res.status(400).json({ error: "Không tìm thấy tài khoản" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      phone: user.phone,
      address: user.address,
      blocked: user.blocked,
    });
  } catch (error) {
    console.log("Lỗi", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const googleLogin = async (req, res) => {
  const { email, name, avatar } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = autoGeneratePassword();

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(generatedPassword, salt);

      // Tạo model
      const newUser = new User({
        name,
        email,
        avatar,
        provider: "google",
        password: hash,
        verified: true,
      });
      await newUser.save();

      generateTokenAndSetCookie(newUser._id, res);

      return res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        blocked: newUser.blocked,
      });
    }

    if (user.blocked) {
      return res.status(400).json({ error: "Tài khoản của bạn đã bị khóa" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      phone: user.phone,
      address: user.address,
      blocked: user.blocked,
    });
  } catch (error) {
    console.log("Lỗi", error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Đã đăng xuất tài khoản" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, password, confirmPassword, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: "Mã OTP đã hết hạn" });
    }

    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({ error: "Mã OTP không hợp lệ" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Mật khẩu không trùng khớp" });
    }

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu hoàn tất" });
  } catch (error) {
    console.log("Error in reset password controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendOtpResetPassword(email, otp);

    return res
      .status(200)
      .json({ message: "Mã OTP đã được gửi tới email của bạn" });
  } catch (error) {
    console.log("Error in send OTP controller", error.message);
    return res.status(500).json({ error: "Lỗi server" });
  }
};
