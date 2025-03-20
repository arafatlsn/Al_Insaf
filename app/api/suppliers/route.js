import Supplier from "@/DB/Models/SupplierModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const suppliers = await Supplier.find();
    return NextResponse.json({ data: suppliers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
