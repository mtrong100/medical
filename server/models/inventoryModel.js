import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constanst.js";

const inventorySchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
      enum: ["Medicine", "Device"],
    },
    status: {
      type: String,
      required: true,
      default: PAYMENT_STATUS.UNPAID,
    },
    items: [  
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        device: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Device",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
