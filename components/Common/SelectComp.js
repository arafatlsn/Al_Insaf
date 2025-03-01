import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

const SelectComp = ({ label = "Label" }) => {
  return (
    <Select>
      <SelectGroup>
        <SelectLabel className="capitalize mb-[4px]">{label}</SelectLabel>
        <SelectTrigger className="w-full h-[40px] border-third focus:outline-none focus:ring-0">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent className="bg-foreground">
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};

export default SelectComp;
