import CustomerModel from "@/DB/Models/CustomerModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const getCustomers = await CustomerModel.find();
    return NextResponse.json({ data: getCustomers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
