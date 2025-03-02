import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const SelectCompObj = ({ label = "Label", options }) => {
  return (
    <Select>
      <SelectGroup>
        <SelectLabel className="capitalize mb-[4px]">{label}</SelectLabel>
        <SelectTrigger className="w-full h-[40px] border-third focus:outline-none focus:ring-0 capitalize">
          <SelectValue placeholder="Select Your Choice" />
        </SelectTrigger>
        <SelectContent className="bg-foreground">
          {options?.map((el) => (
            <SelectItem key={el?.id} value={el?.name} className="capitalize">
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
