"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const SelectComp = ({
  label = "Label",
  options,
  action,
  actionFor,
  required = false,
}) => {
  return (
    <Select
      required
      name={actionFor}
      onValueChange={(e) => action(actionFor, e)}
    >
      <SelectGroup>
        <SelectLabel className="text-[12px] md:text-[13px] xl:text-[14px] capitalize mb-[2px]">
          {label} {required && <span className="text-red-500">*</span>}
        </SelectLabel>
        <SelectTrigger className="w-full h-[30px] md:h-[35px] xl:h-[40px] px-[6px] lg:px-[10px] text-[12px] lg:text-[14px] border-primary focus:outline-none focus:ring-0 capitalize">
          <SelectValue placeholder="Select Your Choice" />
        </SelectTrigger>
        <SelectContent className="bg-foreground">
          {options?.map((el) => (
            <SelectItem key={el} value={el} className="capitalize">
              {el}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SelectComp;
