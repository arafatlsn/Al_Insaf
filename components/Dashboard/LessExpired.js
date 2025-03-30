import { toDateStringFn } from "@/utils/toDateStringFn";
import Image from "next/image";

const LessExpired = ({ data }) => {
  const lessExpiredProducts = data?.data?.lessExpired;
  return (
    <div className="p-[1rem] bg-background rounded-[10px]">
      <h3 className="text-[14px] text-black font-[500] mb-[10px]">
        স্বল্প মেয়াদের প্রোডাক্ট
      </h3>
      <div className="flex flex-col gap-[10px]">
        {lessExpiredProducts?.map((el) => (
          <div
            className="min-w-[200px] max-w-[200px] flex items-center gap-[6px]"
            key={el?._id}
          >
            <div className="min-w-[60px] max-w-[60px]">
              <Image
                className="border"
                src={el?.images[0]}
                alt="product"
                width={60}
                height={60}
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-[14px] m-0 p-0 truncate">{el?.name}</h4>
              <h6 className="text-[12px] font-[500] translate-y-[-.2rem]">{`Stocks: ${el?.totalStock}`}</h6>
              <h6 className="text-[12px] text-failed font-[500] translate-y-[-.2rem]">{`Expired: ${toDateStringFn(
                el?.nextExpiredDate
              )}`}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessExpired;
