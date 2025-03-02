import React from "react";
import InputLabel from "../Common/InputLabel";
import SelectComp from "../Common/SelectComp";
import { productCategories, unitTypes } from "@/utils/Constants";

const BasicInfoFields = () => {
  return (
    <div className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont text-lightText mb-[1rem]">Basic Information</h3>
      <div className="flex flex-col gap-[1rem]">
        <div>
          <InputLabel
            title={"Product Name"}
            htmlFor={"product_name"}
            name={"product_name"}
            id="product_name"
            placeHolder="Product Name"
          />
        </div>
        <div>
          <SelectComp label="Product Category" options={productCategories} />
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
          <div>
            <InputLabel
              title="Selling Price"
              type="number"
              htmlFor="selling_price"
              name="selling_price"
              id="selling_price"
              placeHolder="Selling Price"
            />
          </div>
          <div>
            <InputLabel
              title="Buying Price"
              type="number"
              htmlFor="buying_price"
              name="buying_price"
              id="buying_price"
              placeHolder="Buying Price"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
          <div>
            <InputLabel
              title="Stock"
              type="number"
              htmlFor="stock"
              name="stock"
              id="stock"
              placeHolder="Product Stock"
            />
          </div>
          <div>
            <InputLabel
              title="Stock keeping unit"
              htmlFor="sku"
              name="sku"
              id="sku"
              placeHolder="ex. 5kg-teer-mustardoil"
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
          <div>
            <SelectComp label="Unit Type" options={unitTypes} />
          </div>
          <div>
            <InputLabel
              title="Expired Date"
              type="date"
              htmlFor="expired_date"
              name="expired_date"
              id="expired_date"
              placeHolder="dd-mm-yyyy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
