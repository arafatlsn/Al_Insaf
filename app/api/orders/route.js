import CustomerModel from "@/DB/Models/CustomerModel";
import OrderModel from "@/DB/Models/OrderModel";
import { connectDB } from "@/utils/db";
import { endOfDay, endOfWeek, startOfDay, startOfWeek, subDays, subMonths } from "date-fns";
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
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      };
    } else if (filter === "7d") {
      query.orderDate = {
        $gte: startOfWeek(new Date()),
        $lte: endOfWeek(new Date()),
      };
    } else if (filter === "30d") {
      query.orderDate = {
        $gte: startOfDay(subDays(new Date(), 30)),
        $lte: endOfDay(new Date()),
      };
    } else if (filter === "90d") {
      query.orderDate = {
        $gte: startOfDay(subMonths(new Date(), 3)),
        $lte: endOfDay(new Date()),
      };
    }
    const allOrders = await OrderModel.find(query).populate("customer");
    return NextResponse.json({ data: allOrders }, { status: 200 });
  } catch (error) {
    console.log("error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
