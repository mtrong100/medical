import mongoose from "mongoose";
import {
  deleteUserService,
  getUserCollectionService,
  getUserDetailService,
  updateUserPasswordService,
  updateUserAccountService,
  updateUserService,
  sendOtpService,
} from "../services/userService.js";

export const getUserCollection = async (req, res) => {
  try {
    const users = await getUserCollectionService();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Lỗi tại controller getUserCollection", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

export const getUserDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const userDetail = await getUserDetailService(id);
    return res.status(200).json(userDetail);
  } catch (error) {
    console.log("Lỗi tại controller getUserDetail: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    await sendOtpService(email);

    return res
      .status(200)
      .json({ message: "Mã OTP đã được gửi tới email của bạn" });
  } catch (error) {
    console.log("Lỗi tại controller sendOtp", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedUser = await updateUserService(id, req.body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Lỗi tại controller updateUser: ", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    await updateUserPasswordService(req.body);
    return res.status(200).json({ message: "Đổi mật khẩu hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller updateUserPassword", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateUserAccount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    const updatedUser = await updateUserAccountService(id, req.body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Lỗi tại controller updateUserAccount: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không đúng định dạng" });
  }

  try {
    await deleteUserService(id);
    return res.status(200).json({ message: "Xóa người dùng hoàn tất" });
  } catch (error) {
    console.log("Lỗi tại controller deleteUser", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
