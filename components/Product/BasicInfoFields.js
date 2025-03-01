import React from "react";
import InputLabel from "../Common/InputLabel";
import SelectComp from "../Common/SelectComp";

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
          <SelectComp label="Product Category" />
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
      </div>
    </div>
  );
};

export default BasicInfoFields;
