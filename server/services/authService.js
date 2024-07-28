import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { ACCOUNT_PROVIDER, ACCOUNT_STATUS } from "../utils/constanst.js";
import { autoGeneratePassword } from "../utils/helper.js";

export const registerUserService = async (userData) => {
  const { email, password, confirmPassword, ...data } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Tài khoản đã tồn tại");
  }

  if (password !== confirmPassword) {
    throw new Error("Mật khẩu không trùng khớp");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    ...data,
    email,
    password: hash,
  });

  await newUser.save();
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Không tìm thấy tài khoản");
  }

  if (user.status === ACCOUNT_STATUS.ISLOCKED) {
    throw new Error("Tài khoản của bạn đã bị khóa");
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw new Error("Sai mật khẩu");
  }

  const payload = { userId: user._id, userRole: user.role };

  const {
    resetPasswordOtp,
    resetPasswordExpires,
    password: userPassword,
    ...rest
  } = user._doc;

  return { payload, user: rest };
};

export const googleLoginUserService = async ({ email, name, avatar }) => {
  let user = await User.findOne({ email });

  if (!user) {
    const generatedPassword = autoGeneratePassword();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(generatedPassword, salt);

    user = new User({
      name,
      email,
      avatar,
      provider: ACCOUNT_PROVIDER.GOOGLE,
      password: hash,
    });

    await user.save();
  } else if (user.status === ACCOUNT_STATUS.ISLOCKED) {
    throw new Error("Tài khoản của bạn đã bị khóa");
  }

  const payload = { userId: user._id, userRole: user.role };
  const { resetPasswordOtp, resetPasswordExpires, password, ...rest } =
    user._doc;

  return { payload, user: rest };
};
