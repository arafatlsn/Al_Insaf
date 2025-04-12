"use client";
import InvestIcon from "../Icons/InvestIcon";
import { bdFormatNumber } from "@/utils/bdFormatNumber";
import ExpenseIcon from "../Icons/ExpenseIcon";
import DolorIcon from "../Icons/DolorIcon";

const BusinessSummary = ({ data }) => {
  const totalInvest =
    data?.data?.totalInvest?.length > 0 && data?.data?.totalInvest[0]?.Invest;
  const purchases =
    data?.data?.getPurchase?.length > 0 &&
    data?.data?.getPurchase[0]?.Purchases;
  const sales =
    data?.data?.getSales?.length > 0 && data?.data?.getSales[0]?.Sales;
  const profit =
    data?.data?.getSales?.length > 0 && data?.data?.getSales[0]?.Profit;
  const cash =
    data?.data?.getSales?.length > 0 && data?.data?.getSales[0]?.Cash;
  const due = data?.data?.getSales?.length > 0 && data?.data?.getSales[0]?.Due;

  const time = data?.data?.time;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 bg-background p-[.5rem] md:p-[.8rem] lg:p-[1rem] rounded-[10px] gap-[10px]">
      {/* total invest  */}
      <div className="w-full p-[.5rem] rounded-[6px] bg-foreground">
        <div className="flex items-center gap-[6px] text-lightText">
          <InvestIcon />
          <span className="text-[12px] md:text-[14px] lg:text-[1rem] font-[500]">সব পণ্যের দাম</span>
        </div>
        <div>
          <h1 className="text-[1.2rem] lg:text-[1.5rem] text-black font-bold mt-[6px]">
            {bdFormatNumber(totalInvest)}
          </h1>
        </div>
      </div>
      {/* total purchase */}
      <div className="w-full p-[.5rem] rounded-[6px] bg-foreground">
        <div className="flex items-center gap-[6px] text-lightText">
          <ExpenseIcon />
          <span className="text-[12px] md:text-[14px] lg:text-[1rem] font-[500]">আজকের খরচ</span>
        </div>
        <div>
          <h1 className="text-[1.2rem] lg:text-[1.5rem] text-black font-bold mt-[6px]">
            {bdFormatNumber(purchases)}
          </h1>
        </div>
      </div>
      {/* total sales */}
      <div className="w-full p-[.5rem] rounded-[6px] bg-foreground">
        <div className="flex items-center gap-[6px] text-lightText">
          <DolorIcon />
          <span className="text-[12px] md:text-[14px] lg:text-[1rem] font-[500]">আজকের বিক্রি</span>
        </div>
        <div>
          <h1 className="text-[1.2rem] lg:text-[1.5rem] text-black font-bold mt-[6px]">
            {bdFormatNumber(sales)}
          </h1>
        </div>
      </div>
      {/* total profit */}
      <div className="w-full p-[.5rem] rounded-[6px] bg-foreground">
        <div className="flex items-center gap-[6px] text-lightText">
          <DolorIcon />
          <span className="text-[12px] md:text-[14px] lg:text-[1rem] font-[500]">আজকের মুনাফা</span>
        </div>
        <div>
          <h1 className="text-[1.2rem] lg:text-[1.5rem] text-success font-bold mt-[6px]">
            {bdFormatNumber(profit)}
          </h1>
        </div>
      </div>
      {/* total cash */}
      <div className="w-full p-[.5rem] rounded-[6px] bg-foreground">
        <div className="flex items-center gap-[6px] text-lightText">
          <DolorIcon />
          <span className="text-[12px] md:text-[14px] lg:text-[1rem] font-[500]">নগদ বিক্রি</span>
        </div>
        <div>
          <h1 className="text-[1.2rem] lg:text-[1.5rem] text-success font-bold mt-[6px]">
            {bdFormatNumber(cash)}
          </h1>
        </div>
      </div>
      {/* total due */}
      <div className="w-full p-[.5rem] rounded-[6px] bg-foreground">
        <div className="flex items-center gap-[6px] text-lightText">
          <DolorIcon />
          <span className="text-[12px] md:text-[14px] lg:text-[1rem] font-[500]">বাকি বিক্রি</span>
        </div>
        <div>
          <h1 className="text-[1.2rem] lg:text-[1.5rem] text-failed font-bold mt-[6px]">
            {bdFormatNumber(due)}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default BusinessSummary;
