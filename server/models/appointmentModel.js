import mongoose from "mongoose";
import { APPOINTMENT_STATUS } from "../utils/constanst.js";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: APPOINTMENT_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
