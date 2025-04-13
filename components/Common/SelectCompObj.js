"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const SelectCompObj = ({
  label = "Label",
  options,
  action,
  actionFor,
  required = false,
  size = "large",
}) => {
  return (
    <Select
      name={actionFor}
      onValueChange={(e) => {
        action(actionFor, e);
      }}
    >
      <SelectGroup>
        <SelectLabel className="capitalize mb-[2px] text-[12px] md:text-[13px] xl:text-[14px]">
          {label} {required && <span className="text-red-500">*</span>}{" "}
        </SelectLabel>
        <SelectTrigger
          className={`w-full px-[6px] text-[12px] lg:text-[14px] ${
            size === "large" ? "h-[30px] lg:h-[40px]" : "h-[30px]"
          } border-primary focus:outline-none focus:ring-0 capitalize`}
        >
          <SelectValue placeholder="Select Your Choice" />
        </SelectTrigger>
        <SelectContent className="bg-foreground">
          {options?.map((el) => (
            <SelectItem key={el?._id} value={el?._id} className="capitalize">
              {`${el?.name} - ${el?.address}`}
            </SelectItem>
          ))}
          <SelectItem value={"others"} className="capitalize">
            Others
          </SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SelectCompObj;
