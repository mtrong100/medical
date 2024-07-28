import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendOtpResetPassword } from "../utils/mail.js";

export const updateUserService = async (userId, userData) => {
  try {
    const allowedUpdates = [
      "name",
      "avatar",
      "dateOfBirth",
      "gender",
      "phoneNumber",
      "email",
      "address",
    ];
    const filteredData = {};

    allowedUpdates.forEach((field) => {
      if (userData[field] !== undefined) {
        filteredData[field] = userData[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: filteredData,
      },
      {
        new: true,
      }
    ).select("-password -resetPasswordOtp -resetPasswordExpires");

    if (!user) throw new Error("Không tìm thấy người dùng");

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserDetailService = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "-password -resetPasswordOtp -resetPasswordExpires"
    );

    if (!user) throw new Error("Không tìm thấy người dùng");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserService = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("Không tìm thấy người dùng");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserCollectionService = async () => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      throw new Error("Không tìm thấy collection người dùng");
    }

    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserAccountService = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          status: userData.status,
        },
      },
      {
        new: true,
      }
    ).select("-password -resetPasswordOtp -resetPasswordExpires");

    if (!user) throw new Error("Không tìm thấy người dùng");

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserPasswordService = async (userData) => {
  const { email, password, confirmPassword, otp } = userData;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    if (user.resetPasswordExpires < Date.now()) {
      throw new Error("Mã OTP đã hết hạn");
    }

    if (user.resetPasswordOtp !== otp) {
      throw new Error("Mã OTP không hợp lệ");
    }

    if (password !== confirmPassword) {
      throw new Error("Mật khẩu không khởp");
    }

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordExpires = null;
    user.resetPasswordOtp = null;

    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendOtpService = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Không tìm thấy người dùng");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    const savedUser = await user.save();

    if (savedUser) await sendOtpResetPassword(email, otp);
  } catch (error) {
    throw new Error(error.message);
  }
};
