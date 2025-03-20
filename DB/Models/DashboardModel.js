import mongoose from "mongoose";

export const DashboardSchema = new mongoose.Schema({
  profit: {
    type: Number,
  },
  invest: {
    type: Number,
  },
  sales: {
    type: Number,
  },
});

export default mongoose.models.Dashboard ||
  mongoose.model("Dashboard", DashboardSchema);
