import OrderModel from "@/DB/Models/OrderModel";
import Product from "@/DB/Models/ProductModel";
import PurchaseHistory from "@/DB/Models/PurchaseHistoryModel";
import { connectDB } from "@/utils/db";
import moment from "moment-timezone";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    let queryDate = "1d";
    let startDate = moment().tz("Asia/Dhaka").startOf("day");
    let today = moment().tz("Asia/Dhaka").startOf("day");
    today.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

    if (queryDate === "1d") {
      startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    } else if (queryDate === "7d") {
      startDate.subtract(6, "days").set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    }

    const startDateISO = startDate.toISOString();
    const todayISO = today.toISOString();

    const startOfMonth = moment().tz("Asia/Dhaka").startOf("month");
    const oneMonthFromNow = moment().tz("Asia/Dhaka").startOf("day").add(1, "month");

    const startOfMonthISO = startOfMonth.toISOString();
    const oneMonthFromNowISO = oneMonthFromNow.toISOString();

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
              nextExpiredDate: { $lte: new Date(oneMonthFromNowISO), $ne: null },
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
              orderDate: { $gte: new Date(startDateISO), $lte: new Date(todayISO) },
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
              createdAt: { $gte: new Date(startDateISO), $lte: new Date(todayISO) },
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

    const [sales, purchases] = await Promise.all([
      OrderModel.aggregate([
        {
          $match: {
            orderDate: { $gte: new Date(startOfMonthISO), $lte: new Date(todayISO) },
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
            createdAt: { $gte: new Date(startOfMonthISO), $lte: new Date(todayISO) },
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

    const todayDate = moment().tz("Asia/Dhaka").format("YYYY-MM-DD");
    const startOfMonthDate = moment()
      .tz("Asia/Dhaka")
      .startOf("month")
      .format("YYYY-MM-DD");

    const allDates = [];
    let date = moment(startOfMonthDate);
    while (date.format("YYYY-MM-DD") <= todayDate) {
      allDates.push(date.format("YYYY-MM-DD"));
      date.add(1, "day");
    }

    const salesMap = Object.fromEntries(
      sales?.map((s) => [s._id, s.totalSales])
    );
    const purchasesMap = Object.fromEntries(
      purchases?.map((p) => [p._id, p.totalPurchase])
    );

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
          lessExpired,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("dashboard route error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}