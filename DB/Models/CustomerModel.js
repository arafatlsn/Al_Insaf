import mongoose from "mongoose";


const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);