import { DateTime } from "luxon";
import mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          selectedPurchaseId: { type: String, required: true },
          price: {
            type: Number,
            required: true,
          },
          totalAmount: {
            type: Number,
            required: true,
          },
          costing: {
            type: Number,
            required: true,
          },
          profit: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    profit: { type: Number, required: true },
    costing: { type: Number, required: true },
    cash: { type: Number },
    due: { type: Number },
    discount: { type: Number, default: 0 },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "delivered", "canceled"],
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "mobile banking", "other"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "dued"],
      default: "paid",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    notes: { type: String },
    orderDate: {
      type: Date,
      default: () =>
        DateTime.now().setZone("Asia/Dhaka").plus({ hours: 6 }).toISO(),
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
