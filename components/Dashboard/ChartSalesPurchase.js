"use client";
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
import useResponsive from "../Custom_Hooks/useResponsive";

const ChartSalesPurchase = ({ data }) => {
  const { isMobile, isTablet } = useResponsive();
  const salesPurchaseData = data?.data?.salesPurchaseData;
  return (
    <div className="w-full h-[220px] md:h-[300px] lg:h-[400px] xl:h-[500px] flex justify-center bg-background py-[1rem] rounded-[10px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={salesPurchaseData}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => date}
            interval={0} // Show all dates
            angle={isMobile ? -90 : -45} // Rotate labels to prevent overlap
            textAnchor="end"
            height={isMobile ? 40 : isTablet ? 35 : 40} // Increase height to avoid tooltip overlap
            padding={{
              right: isMobile ? 5 : 10,
            }}
            fontSize={isMobile ? 10 : isTablet ? 12 : 14}
          />
          <YAxis
            width={isMobile ? 30 : 40}
            padding={{
              left: isMobile ? 5 : 10,
            }}
            fontSize={isMobile ? 10 : isTablet ? 12 : 14}
          />
          <Tooltip
            wrapperStyle={{ zIndex: 1000 }} // Ensure tooltip appears above everything
            contentStyle={{ fontSize: "12px" }} // Make tooltip text smaller
          />
          <Legend
            wrapperStyle={{
              fontSize: isMobile ? 9 : isTablet ? 11 : 14,
            }}
          />
          <Line
            type="monotone"
            dataKey="TotalPurchase"
            stroke="#00695C"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="TotalSales" stroke="#3a7dff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSalesPurchase;
