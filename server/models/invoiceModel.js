import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constanst.js";

const invoiceSchema = new mongoose.Schema(
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
    price: { type: Number, required: true },
    healthInsurance: { type: Boolean, default: false },
    total: { type: Number, required: true },
    paymentStatus: {
      type: String,
      required: true,
      default: PAYMENT_STATUS.UNPAID,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
