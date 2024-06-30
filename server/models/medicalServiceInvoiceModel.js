import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constanst.js";

const medicalServiceInvoiceSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    detail: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MedicalService",
          required: true,
        },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, required: true, default: PAYMENT_STATUS.UNPAID },
  },
  {
    timestamps: true,
  }
);

const MedicalServiceInvoice = mongoose.model(
  "MedicalServiceInvoice",
  medicalServiceInvoiceSchema
);
export default MedicalServiceInvoice;
