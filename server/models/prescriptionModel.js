import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constanst.js";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    detail: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    notes: { type: String },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: PAYMENT_STATUS.UNPAID },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
