import OrderModel from "@/DB/Models/OrderModel";
import Product from "@/DB/Models/ProductModel";
import PurchaseHistory from "@/DB/Models/PurchaseHistoryModel";
import { connectDB } from "@/utils/db";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    let queryDate = "1d";
    let startDate = new Date();
    let today = new Date();
    today.setHours(23, 59, 59, 999);
    // calculate the time
    if (queryDate === "1d") {
      startDate.setHours(0, 0, 0, 0);
    } else if (queryDate === "7d") {
      startDate.setDate(startDate.getDate() - 6); // Go back 6 days (including today)
      startDate.setHours(0, 0, 0, 0);
    }

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    // querieng for business summary
    const [totalInvest, lessStocks, lessExpired, getSales, getPurchase] =
      await Promise.all([
        Product.aggregate([
          {
            $group: {
              _id: null,
              Invest: { $sum: "$invest" },
            },
          },
        ]),
        Product.aggregate([
          {
            $match: {
              totalStock: { $lte: 20 },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              totalStock: 1,
              images: 1,
            },
          },
          {
            $sort: { totalStock: 1 },
          },
        ]),
        Product.aggregate([
          { $unwind: "$purchase" },
          {
            $match: {
              nextExpiredDate: { $lte: oneMonthFromNow, $ne: null },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              totalStock: 1,
              images: 1,
              nextExpiredDate: 1,
            },
          },
          {
            $sort: { nextExpiredDate: 1 },
          },
        ]),
        OrderModel.aggregate([
          {
            $match: {
              createdAt: { $gte: startDate, $lte: today },
            },
          },
          {
            $group: {
              _id: null,
              Sales: { $sum: "$totalAmount" },
              Profit: { $sum: "$profit" },
              Cash: { $sum: "$cash" },
              Due: { $sum: "$due" },
            },
          },
        ]),
        PurchaseHistory.aggregate([
          {
            $match: {
              createdAt: { $gte: startDate, $lte: today },
            },
          },
          {
            $group: {
              _id: null,
              Purchases: { $sum: "$totalCost" },
            },
          },
        ]),
      ]);

    // querieng for sales purchases chart
    const [sales, purchases] = await Promise.all([
      OrderModel.aggregate([
        {
          $match: {
            orderDate: { $gte: startOfMonth, $lte: today },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
            totalSales: { $sum: "$totalAmount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      PurchaseHistory.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth, $lte: today },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            totalPurchase: { $sum: "$totalCost" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    // get all dates of a month
    const todayDate = moment().format("YYYY-MM-DD"); // Current date
    const startOfMonthDate = moment().startOf("month").format("YYYY-MM-DD");

    const allDates = [];
    let date = moment(startOfMonthDate);

    while (date.format("YYYY-MM-DD") <= todayDate) {
      allDates.push(date.format("YYYY-MM-DD"));
      date.add(1, "day");
    }
    // Convert sales & purchases to a lookup object for fast merging
    const salesMap = Object.fromEntries(
      sales?.map((s) => [s._id, s.totalSales])
    );
    const purchasesMap = Object.fromEntries(
      purchases?.map((p) => [p._id, p.totalPurchase])
    );
    // Merge and fill missing dates with zero
    const salesPurchaseData = allDates?.map((date) => ({
      date: `${date?.split("-")[2]}-${date?.split("-")[1]}`,
      TotalSales: salesMap[date] || 0,
      TotalPurchase: purchasesMap[date] || 0,
    }));
    return NextResponse.json(
      {
        data: {
          totalInvest,
          getSales,
          getPurchase,
          salesPurchaseData,
          lessStocks,
          lessExpired
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("dashboard route error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
