import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Fruits",
        "Vegetables",
        "Dairy",
        "Meat",
        "Bakery",
        "Beverages",
        "Snacks",
        "Other",
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [],
    },
    buyingPrice: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    sku: {
      type: String,
      required: true,
    },
    unitType: {
      type: String,
      required: true,
      enum: ["kg", "piece", "pack", "ml", "litre"],
    },
    expiryDate: {
      type: Date,
    },
    // addedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
