import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    description: { type: String },
    dosage: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
