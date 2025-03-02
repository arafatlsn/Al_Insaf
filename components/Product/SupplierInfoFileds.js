import React from "react";
import SelectCompObj from "../Common/SelectCompObj";
import { suppliers } from "@/utils/Constants";
import InputLabel from "../Common/InputLabel";

const SupplierInfoFileds = () => {
  return (
    <section className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont mb-[1rem]">Supplier Information</h3>
      <div className="flex flex-col gap-[1rem]">
        <div>
          <SelectCompObj label="Supplier" options={suppliers} />
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
          <div>
            <InputLabel
              title="Supplier Name"
              htmlFor="supplier_name"
              name="supplier_name"
              id="supplier_name"
              placeHolder="ex. Ripon Traders"
            />
          </div>
          <div>
            <InputLabel
              title="Supplier Contact"
              htmlFor="supplier_contact"
              name="supplier_contact"
              id="supplier_contact"
              placeHolder="ex. 017########"
            />
          </div>
        </div>
        <div>
          <InputLabel
            title="Supplier Address"
            htmlFor="supplier_address"
            name="supplier_address"
            id="supplier_address"
            placeHolder="ex. 120/A Baburhat College Road"
          />
        </div>
      </div>
    </section>
  );
};

export default SupplierInfoFileds;
