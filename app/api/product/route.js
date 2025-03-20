import { connectDB } from "@/utils/db";
import Product from "@/DB/Models/ProductModel";
import Supplier from "@/DB/Models/SupplierModel";
import { NextResponse } from "next/server";
import { fileToBuffer } from "@/utils/fileToBuffer";
import cloudinary from "@/utils/cloudinary";
import mongoose from "mongoose";

export async function GET(req) {
  await connectDB();
  const searchParams = req.nextUrl.searchParams;
  const filter = searchParams.get("filter");
  const search = searchParams.get("search");
  let query = {};

  try {
    if (search) {
      // Search for customer details, NOT by _id
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
        { sku: { $regex: search, $options: "i" } }, // Search by address
        { category: { $regex: search, $options: "i" } }, // Search by contact
      ];
    }
    const products = await Product.find(query);
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = Number(formData.get("price"));
  const purchase = JSON.parse(formData.get("purchase"));
  const supplier = formData.get("supplier");
  const newSupplier = JSON.parse(formData.get("newSupplier"));
  const sku = formData.get("sku");
  const unitType = formData.get("unitType");
  const images = formData.getAll("images");

  let totalStock = 0;
  let invest = 0;
  let minExpiredDate = purchase[0]?.expired;

  // checking all required fields
  if (
    !name ||
    !category ||
    !price ||
    !purchase?.length ||
    !supplier ||
    !sku ||
    !unitType ||
    (supplier?.toLowerCase() === "others" && !newSupplier?.name)
  ) {
    return NextResponse.json(
      { message: "missing required fields!" },
      { status: 500 }
    );
  }

  const session = await mongoose.startSession();

  for (let product of purchase) {
    totalStock = totalStock + product?.stock;
    invest =
      invest + (product?.buyingCost + product?.serviceCost) * product?.stock;
    if (
      new Date(product?.expired).getTime() < new Date(minExpiredDate).getTime
    ) {
      minExpiredDate = product?.expired;
    }
  }

  const productObj = {
    name,
    description,
    category,
    price,
    purchase,
    supplier,
    sku,
    unitType,
    images: [],
    invest,
    totalStock,
    nextExpiredDate: minExpiredDate,
  };
  try {
    // connect db
    await connectDB();
    session.startTransaction();
    // 1️⃣ create the supplier is not exist
    if (supplier.toLowerCase() === "others") {
      const newSupplierRes = await Supplier.create([newSupplier], { session });
      // now replace the supplier with new supplier _id
      productObj["supplier"] = newSupplierRes[0]?._id;
    }
    // 2️⃣ create the product
    const newProduct = await Product.create([productObj], { session });
    const productId = newProduct[0]._id;

    // Upload images to Cloudinary
    const uploadPromises = images.map(async (image) => {
      const buffer = await fileToBuffer(image);

      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            resolve(result.secure_url);
          })
          .end(buffer);
      });
    });

    const uploadedImageUrls = await Promise.all(uploadPromises);
    // 3️⃣ Update product with image URLs
    await Product.findByIdAndUpdate(
      productId,
      {
        images: uploadedImageUrls,
      },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "Seccessfully Added a New Product" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error:", error?.message);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
