import mongoose from "mongoose";

const medicalServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const MedicalService = mongoose.model("MedicalService", medicalServiceSchema);
export default MedicalService;
