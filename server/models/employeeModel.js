import mongoose from "mongoose";
import { EMPLOYEE_STATUS, PROFILE_IMAGE } from "../utils/constanst.js";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: true, default: PROFILE_IMAGE.DEFAULT },
    graduatedFrom: { type: String },
    specialization: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true, default: 0 },
    description: { type: String },
    role: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: EMPLOYEE_STATUS.ISWORKING,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
