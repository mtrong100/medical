import mongoose from "mongoose";
import { PROFILE_IMAGE } from "../utils/constanst.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default: PROFILE_IMAGE.DEFAULT,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    address: { type: String, default: null },
    phoneNumber: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    blocked: { type: Boolean, default: false },
    resetPasswordOtp: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
