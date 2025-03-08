import { connectDB } from "@/utils/db";
import Product from "@/DB/Models/ProductModel";
import Supplier from "@/DB/Models/SupplierModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqData = await req.json();
  try {
    // connect db
    await connectDB();
    // create the supplier is not exist
    let newSupplier;
    if (reqData.supplier.toLowerCase() === "others") {
      newSupplier = await Supplier.create([reqData?.newSupplier]);
      // now replace the supplier with new supplier _id
      reqData["supplier"] = newSupplier[0]?._id;
    }
    // create the product
    const newProduct = await Product.create([reqData]);
    console.log('new product:', newProduct);
    return NextResponse.json({ message: "hello world" }, { status: 200 });
  } catch (error) {
    console.log("error:", error?.message);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
