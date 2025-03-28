import OrderModel from "@/DB/Models/OrderModel";
import Product from "@/DB/Models/ProductModel";
import PurchaseHistory from "@/DB/Models/PurchaseHistoryModel";
import { connectDB } from "@/utils/db";
import {
  addDays,
  eachDayOfInterval,
  endOfDay,
  format,
  startOfDay,
  startOfMonth,
  subDays,
} from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req) {
  const next10Days = addDays(startOfDay(new Date()), 10);
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
                $lte: next10Days,
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
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date()),
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
                $gte: startOfDay(new Date()),
                $lte: endOfDay(new Date()),
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
              $gte: startOfMonth(new Date()),
              $lte: endOfDay(new Date()),
            },
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
            createdAt: {
              $gte: startOfMonth(new Date()),
              $lte: endOfDay(new Date()),
            },
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

    const start = startOfMonth(new Date());
    const end = endOfDay(new Date());
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
