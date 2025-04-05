import OrderModel from "@/DB/Models/OrderModel";
import Product from "@/DB/Models/ProductModel";
import PurchaseHistory from "@/DB/Models/PurchaseHistoryModel";
import { connectDB } from "@/utils/db";
import { eachDayOfInterval, format } from "date-fns";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

// Define the Bangladesh timezone
const BANGLADESH_TIMEZONE = "Asia/Dhaka"; // UTC+6

export async function GET(req) {
  const nowInBangladesh = DateTime.now().setZone(BANGLADESH_TIMEZONE).toISO();
  // Calculate the start and end of the day in Bangladesh timezone, then convert to UTC for MongoDB query
  const startOfDayInBD = DateTime.now()
    .setZone(BANGLADESH_TIMEZONE)
    .startOf("day");
  const endOfDayInBD = DateTime.now().setZone(BANGLADESH_TIMEZONE).endOf("day");
  // For monthly sales and purchases, also adjust for timezone
  const startOfMonthInBD = DateTime.now()
    .setZone(BANGLADESH_TIMEZONE)
    .startOf("month");
  const endOfMonthInBd = DateTime.now()
    .setZone(BANGLADESH_TIMEZONE)
    .endOf("month");
  // Calculate next 10 days in Bangladesh timezone
  const next10DaysInBD = DateTime.now()
    .setZone(BANGLADESH_TIMEZONE)
    .plus({ days: 10 })
    .endOf("day");

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
                $lte: next10DaysInBD,
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
                $gte: startOfDayInBD,
                $lte: endOfDayInBD,
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

    const [sales, purchases] = await Promise.all([
      OrderModel.aggregate([
        {
          $match: {
            orderDate: {
              $gte: startOfMonthInBD,
              $lte: endOfMonthInBd,
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
              $gte: startOfMonthInBD,
              $lte: endOfMonthInBd,
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

    // Get the current date
    const now = DateTime.local();
    // Get the year and month from the current date
    const year = now.year;
    const month = now.month;
    const today = now.day;
    // Get the number of days in the current month
    const daysInMonth = now.daysInMonth;
    // Array to hold all dates
    const dates = [];

    // Loop through each day and add it to the array
    for (let day = 1; day <= today; day++) {
      dates.push(DateTime.fromObject({ year, month, day }).toISODate());
    }

    const salesMap = Object.fromEntries(
      sales?.map((s) => [s._id, s.totalSales])
    );
    const purchasesMap = Object.fromEntries(
      purchases?.map((p) => [p._id, p.totalPurchase])
    );

    const salesPurchaseData = dates?.map((date) => ({
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
          time: {
            nowInBangladesh,
            startOfDayInBD,
            endOfDayInBD,
            startOfMonthInBD,
            endOfMonthInBd,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("dashboard route error:", error?.message);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
