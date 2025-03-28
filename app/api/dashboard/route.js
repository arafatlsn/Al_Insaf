import OrderModel from "@/DB/Models/OrderModel";
import Product from "@/DB/Models/ProductModel";
import PurchaseHistory from "@/DB/Models/PurchaseHistoryModel";
import { convertToLocal, convertToUTC } from "@/utils/convertTime";
import { connectDB } from "@/utils/db";
import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  format,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { NextResponse } from "next/server";

// Define the Bangladesh timezone
const BANGLADESH_TIMEZONE = "Asia/Dhaka"; // UTC+6

export async function GET(req) {
  // Get the current time in Bangladesh timezone
  const nowInBangladesh = convertToLocal(new Date());

  // Calculate the start and end of the day in Bangladesh timezone, then convert to UTC for MongoDB query
  const startOfDayInBD = startOfDay(nowInBangladesh);
  const endOfDayInBD = endOfDay(nowInBangladesh);

  // Convert to UTC for MongoDB query (MongoDB stores dates in UTC)
  const startOfDayInUTC = convertToUTC(startOfDayInBD);
  const endOfDayInUTC = convertToUTC(endOfDayInBD);
  // Calculate next 10 days in Bangladesh timezone
  const next10DaysInBD = addDays(startOfDayInBD, 10);
  const next10DaysInUTC = convertToUTC(next10DaysInBD);

  try {
    await connectDB();

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
              nextExpiredDate: {
                $lte: next10DaysInUTC,
                $ne: null,
              },
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
              orderDate: {
                $gte: startOfDayInBD,
                $lte: endOfDayInBD,
              },
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
              createdAt: {
                $gte: startOfDayInUTC,
                $lte: endOfDayInUTC,
              },
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

    // For monthly sales and purchases, also adjust for timezone
    const startOfMonthInBD = startOfMonth(nowInBangladesh);
    const startOfMonthInUTC = convertToUTC(startOfMonthInBD);
    const endOfDayInUTCForMonth = convertToUTC(endOfDayInBD);

    const [sales, purchases] = await Promise.all([
      OrderModel.aggregate([
        {
          $match: {
            orderDate: {
              $gte: startOfMonthInUTC,
              $lte: endOfDayInUTCForMonth,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$orderDate",
                timezone: BANGLADESH_TIMEZONE,
              },
            },
            totalSales: { $sum: "$totalAmount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      PurchaseHistory.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfMonthInUTC,
              $lte: endOfDayInUTCForMonth,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: BANGLADESH_TIMEZONE,
              },
            },
            totalPurchase: { $sum: "$totalCost" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const start = startOfMonthInBD;
    const end = endOfDayInBD;
    const allDates = eachDayOfInterval({ start, end }).map((date) =>
      format(date, "yyyy-MM-dd")
    );

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
