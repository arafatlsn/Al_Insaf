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
        "Others",
      ],
    },
    images: {
      type: [],
    },
    price: { type: Number, required: true, default: 0 },
    purchase: {
      type: [
        {
          buyingCost: { type: Number, required: true, default: 0 },
          serviceCost: { type: Number, default: 0 },
          sellingPrice: { type: Number, required: true, default: 0 },
          stock: { type: Number, required: true, min: 0, default: 0 },
          expired: {
            type: Date || null,
            set: function (value) {
              const parsedDate = new Date(value);
              return isNaN(parsedDate.getTime()) ? null : parsedDate;
            },
          },
          supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
          profit: { type: Number, min: 0, default: 0 },
        },
      ],
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
    invest: { type: Number, default: 0 },
    totalStock: {
      type: Number,
      required: true,
      min: 10,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
    },
    unitType: {
      type: String,
      required: true,
      enum: [
        "kg",
        "piece",
        "pack",
        "ml",
        "litre",
        "bottle",
        "gallon",
        "others",
      ],
    },
    nextExpiredDate: {
      type: Date || null,
      set: function (value) {
        const parsedDate = new Date(value);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
      },
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
