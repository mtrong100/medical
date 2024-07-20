import mongoose from "mongoose";
import {
  ACCOUNT_PROVIDER,
  ACCOUNT_STATUS,
  PROFILE_IMAGE,
} from "../utils/constanst.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true, default: PROFILE_IMAGE.DEFAULT },
    dateOfBirth: { type: String },
    gender: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    status: {
      type: String,
      required: true,
      default: ACCOUNT_STATUS.ISACTIVE,
    },
    provider: {
      type: String,
      required: true,
      default: ACCOUNT_PROVIDER.EMAIL_PASSWORD,
    },
    isAdmin: { type: Boolean, default: false },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
