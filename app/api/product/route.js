import { connectDB } from "@/utils/db";
import ProductModel from "@/DB/Models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    const products = await ProductModel.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
