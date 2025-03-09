import { connectDB } from "@/utils/db";
import Product from "@/DB/Models/ProductModel";
import Supplier from "@/DB/Models/SupplierModel";
import { NextResponse } from "next/server";
import { fileToBuffer } from "@/utils/fileToBuffer";
import cloudinary from "@/utils/cloudinary";

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = Number(formData.get("price"));
  const buyingPrice = Number(formData.get("buyingPrice"));
  const stock = Number(formData.get("stock"));
  const supplier = formData.get("supplier");
  const newSupplier = JSON.parse(formData.get("newSupplier"));
  const sku = formData.get("sku");
  const unitType = formData.get("unitType");
  const images = formData.getAll("images");

  const productObj = {
    name,
    description,
    category,
    price,
    buyingPrice,
    stock,
    supplier,
    sku,
    unitType,
    images: [],
  };
  try {
    // connect db
    await connectDB();
    // create the supplier is not exist
    if (supplier.toLowerCase() === "others") {
      const newSupplierRes = await Supplier.create([newSupplier]);
      // now replace the supplier with new supplier _id
      productObj["supplier"] = newSupplierRes[0]?._id;
    }
    // create the product
    const newProduct = await Product.create([productObj]);
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
    await Product.findByIdAndUpdate(productId, { images: uploadedImageUrls });
    return NextResponse.json(
      { message: "Seccessfully Added a New Product" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error:", error?.message);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
