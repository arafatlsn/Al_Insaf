import CustomerModel from "@/DB/Models/CustomerModel";
import OrderModel from "@/DB/Models/OrderModel";
import ProductModel from "@/DB/Models/ProductModel";
import { connectDB } from "@/utils/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqData = await req.json();
  const cartItems = reqData?.products;

  // start session
  try {
    await connectDB();
    const session = await mongoose.startSession();
    session.startTransaction();
    // 1️⃣ create the customer is not exist
    if (reqData?.customer.toLowerCase() === "others") {
      const newCustomerRes = await CustomerModel.create(
        [reqData?.newCustomer],
        { session }
      );
      // now replace the customer with new supplier _id
      reqData["customer"] = newCustomerRes[0]?._id;
    }

    if (reqData?.due > 0) {
      reqData["paymentStatus"] = "dued";
    } else if (reqData?.due === 0) {
      reqData["paymentStatus"] = "paid";
      reqData["cash"] = reqData?.totalAmount;
    }
    // 2️⃣ place the order
    const newOrder = await OrderModel.create([reqData], { session });

    // 3️⃣ now decrese the stocks from product collection
    for (let product of cartItems) {
      const findProduct = await ProductModel.findOne({
        _id: product?.product,
      });
      const allPurchase = findProduct?.purchase;
      let newPurchases = [];
      let invest = 0;
      for (let purchase of allPurchase) {
        if (purchase?._id?.toString() === product?.selectedPurchaseId) {
          purchase["stock"] -= product?.quantity;
          newPurchases?.push(purchase);
          invest +=
            purchase?.stock * (purchase?.buyingCost + purchase?.serviceCost);
        } else {
          newPurchases?.push(purchase);
          invest +=
            purchase?.stock * (purchase?.buyingCost + purchase?.serviceCost);
        }
      }

      findProduct["invest"] = invest;
      findProduct["totalStock"] -= product?.quantity;
      findProduct["sold"] += product?.quantity;
      findProduct["purchase"] = newPurchases;
      await findProduct.save({ session });
    }
    await session.commitTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "Successfully Placed an Order" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error place order:", error?.message);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
