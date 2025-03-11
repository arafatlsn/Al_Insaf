import mongoose from "mongoose";

export const PurchaseHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyingCost: { type: Number, required: true, default: 0 },
    serviceCost: { type: Number, default: 0 },
    sellingPrice: { type: Number, required: true, default: 0 },
    addedStock: { type: Number, required: true, default: 0},
  },
  { timestamps: true }
);

export default mongoose.models.PurchaseHistory ||
  mongoose.model("PurchaseHistory", PurchaseHistorySchema);
