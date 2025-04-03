import CustomerModel from "@/DB/Models/CustomerModel";
import OrderModel from "@/DB/Models/OrderModel";
import { connectDB } from "@/utils/db";
import { BANGLADESH_TIMEZONE } from "@/utils/url";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    let query = {};

    if (search) {
      const customers = await CustomerModel.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { contact: { $regex: search, $options: "i" } },
        ],
      }).select("_id");
      const customerIds = customers?.map((customer) => customer._id);

      query.customer = { $in: customerIds };
    }
    // Filtering logic based on query parameters
    if (filter === "dued") {
      query.paymentStatus = "dued";
    } else if (filter === "today") {
      query.orderDate = {
        $gte: DateTime.now().setZone(BANGLADESH_TIMEZONE).startOf("day"),
        $lte: DateTime.now().setZone(BANGLADESH_TIMEZONE).endOf("day"),
      };
    } else if (filter === "7d") {
      query.orderDate = {
        $gte: DateTime.now().setZone(BANGLADESH_TIMEZONE).startOf("week"),
        $lte: DateTime.now().setZone(BANGLADESH_TIMEZONE).endOf("day"),
      };
    } else if (filter === "30d") {
      query.orderDate = {
        $gte: DateTime.now().setZone(BANGLADESH_TIMEZONE).startOf("month"),
        $lte: DateTime.now().setZone(BANGLADESH_TIMEZONE).endOf("day"),
      };
    } else if (filter === "90d") {
      query.orderDate = {
        $gte: DateTime.now()
          .setZone(BANGLADESH_TIMEZONE)
          .startOf("month")
          .minus({ month: 3 }),
        $lte: DateTime.now().setZone(BANGLADESH_TIMEZONE).endOf("day"),
      };
    }
    const allOrders = await OrderModel.find(query).populate("customer");
    return NextResponse.json({ data: allOrders }, { status: 200 });
  } catch (error) {
    console.log("error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
