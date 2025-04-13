"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const SelectFilter = ({ options, action, actionFor, size = "large" }) => {
  return (
    <Select
      onValueChange={(e) => {
        action(actionFor, e);
      }}
    >
      <SelectGroup>
        <SelectTrigger
          className={`w-full px-[.3rem] ${
            size === "large" ? "h-[28px] md:h-[30px] lg:h-[34px] xl:h-[40px] text-[12px] md:text-[14px]" : "h-[30px] text-[12px]"
          } border-primary focus:outline-none focus:ring-0 capitalize`}
        >
          <SelectValue placeholder="Filter Order" />
        </SelectTrigger>
        <SelectContent className="bg-foreground">
          {options?.map((el) => (
            <SelectItem key={el?.id} value={el?.value} className="capitalize">
              {`${el?.title}`}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SelectFilter;
