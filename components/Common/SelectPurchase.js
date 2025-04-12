"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toDateStringFn } from "@/utils/toDateStringFn";
import { SelectGroup } from "@radix-ui/react-select";

const SelectPurchase = ({ options, action, id, size = "large" }) => {
  return (
    <Select
      onValueChange={(e) => {
        action(id, e, "selectedPurchase", e);
      }}
    >
      <SelectGroup>
        <SelectTrigger
          className={`w-full ${
            size === "large" ? "h-[40px]" : "h-[25px] p-[3px] text-[12px]"
          } border-primary focus:outline-none focus:ring-0 capitalize`}
        >
          <SelectValue placeholder="Select Your Choice" />
        </SelectTrigger>
        <SelectContent className="bg-foreground">
          {options?.map((el, index) => (
            <SelectItem value={index} key={el?._id}>
              <div className="text-[9px] md:text-[12px]">
                <span className="font-[500]">cost: </span>
                <span>{`${el?.buyingCost + el?.serviceCost} - `}</span>
                <span className="font-[500]">sell: </span>
                <span>{`${el?.sellingPrice} - `}</span>
                <span className="font-[500]">stock: </span>
                <span>{`${el?.stock}`}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SelectPurchase;
