import mongoose from "mongoose";
import { EMPLOYEE_STATUS } from "../utils/constanst.js";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    graduatedFrom: { type: String, required: true },
    specialization: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    isDeleted: { type: Boolean, default: false, required: true },
    salary: { type: Number, required: true, default: 12000000 },
    description: { type: String },
    status: {
      type: String,
      default: EMPLOYEE_STATUS.ISWORKING,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
