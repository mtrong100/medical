import mongoose from "mongoose";

const invoiceDetailSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const InvoiceDetail = mongoose.model("InvoiceDetail", invoiceDetailSchema);
export default InvoiceDetail;
