"use client";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const ChartSalesPurchase = ({ data }) => {
  const salesPurchaseData = data?.data?.salesPurchaseData;
  console.log(salesPurchaseData);
  return (
    <div className="w-full h-[500px] bg-background p-[1rem] rounded-[10px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={salesPurchaseData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => date}
            interval={0} // Show all dates
            angle={-45} // Rotate labels to prevent overlap
            textAnchor="end"
            height={50} // Increase height to avoid tooltip overlap
            padding={{ left: 10, right: 10 }} // Add padding for spacing
          />
          <YAxis />
          <Tooltip
            wrapperStyle={{ zIndex: 1000 }} // Ensure tooltip appears above everything
            contentStyle={{ fontSize: "12px" }} // Make tooltip text smaller
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalPurchase"
            stroke="#f4a261"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="TotalSales" stroke="#3a7dff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSalesPurchase;
