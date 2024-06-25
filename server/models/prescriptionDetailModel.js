import mongoose from "mongoose";

const prescriptionDetailSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const PrescriptionDetail = mongoose.model(
  "PrescriptionDetail",
  prescriptionDetailSchema
);
export default PrescriptionDetail;
