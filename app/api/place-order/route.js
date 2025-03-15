import CustomerModel from "@/DB/Models/CustomerModel";
import OrderModel from "@/DB/Models/OrderModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqData = await req.json();
  try {
    await connectDB();
    // 1️⃣ create the customer is not exist
    if (reqData?.customer.toLowerCase() === "others") {
      const newCustomerRes = await CustomerModel.create([reqData?.newCustomer]);
      // now replace the customer with new supplier _id
      reqData["customer"] = newCustomerRes[0]?._id;
    }
    // 2️⃣ create the product
    const newOrder = await OrderModel.create([reqData]);
    console.log("placed new order:", newOrder);
    return NextResponse.json(
      { message: "successfully placed order" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
