"use client";
import { useDashbaordDataQuery } from "@/Redux/APIs/DashboardApi";
import BusinessSummary from "../Dashboard/BusinessSummary";
import ChartSalesPurchase from "../Dashboard/ChartSalesPurchase";
import LessStocks from "../Dashboard/LessStocks";
import LessExpired from "../Dashboard/LessExpired";
import moment from 'moment-timezone'

const DashboardPage = () => {
  const { data } = useDashbaordDataQuery();
  return (
    <div className="flex gap-[10px]">
      <div className="grow flex flex-col gap-[2rem]">
        <BusinessSummary data={data} />
        <ChartSalesPurchase data={data} />
      </div>
      <div className="flex flex-col gap-[1rem]">
        <LessStocks data={data} />
        <LessExpired data={data} />
      </div>
    </div>
  );
};

export default DashboardPage;
