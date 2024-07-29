import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicineCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
