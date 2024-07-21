import mongoose from "mongoose";
import { ACCOUNT_STATUS, PROFILE_IMAGE } from "../utils/constanst.js";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true, default: PROFILE_IMAGE.DEFAULT },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    status: {
      type: String,
      required: true,
      default: ACCOUNT_STATUS.ISACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
