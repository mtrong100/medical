import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  autoGeneratePassword,
  generateTokenAndSetCookie,
} from "../utils/helper.js";
import { sendOtpResetPassword } from "../utils/mail.js";
import { ACCOUNT_PROVIDER, ACCOUNT_STATUS } from "../utils/constanst.js";

export const register = async (req, res) => {
  const { email, password, confirmPassword, ...data } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu không trùng khớp" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...data,
      email,
      password: hash,
    });

    await newUser.save();

    const payload = { userId: newUser._id };

    generateTokenAndSetCookie(payload, res);

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
    });
  } catch (error) {
    console.log("Lỗi tại controller register", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy tài khoản" });
    }

    if (user.status === ACCOUNT_STATUS.ISLOCKED) {
      return res.status(400).json({ message: "Tài khoản của bạn đã bị khóa" });
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const payload = { userId: user._id, userRole: user.role };

    generateTokenAndSetCookie(payload, res);

    const { resetPasswordOtp, resetPasswordExpires, password, ...rest } =
      user._doc;

    return res.status(200).json(rest);
  } catch (error) {
    console.log("Lỗi tại controller login", error);
    return res.status(500).json({ message: "Lỗi server" });
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

      const newUser = new User({
        name,
        email,
        avatar,
        provider: ACCOUNT_PROVIDER.GOOGLE,
        password: hash,
      });

      await newUser.save();

      const payload = { userId: newUser._id, userRole: newUser.role };
      generateTokenAndSetCookie(payload, res);

      const { resetPasswordOtp, resetPasswordExpires, password, ...rest } =
        newUser._doc;

      return res.status(200).json(rest);
    }

    if (user.status === ACCOUNT_STATUS.ISLOCKED) {
      return res.status(400).json({ message: "Tài khoản của bạn đã bị khóa" });
    }

    const payload = { userId: user._id, userRole: user.role };
    generateTokenAndSetCookie(payload, res);

    const { resetPasswordOtp, resetPasswordExpires, password, ...rest } =
      user._doc;

    return res.status(200).json(rest);
  } catch (error) {
    console.log("Lỗi", error);
    return res.status(500).json({ error: "Lỗi server" });
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
