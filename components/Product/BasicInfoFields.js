"use client";
import React from "react";
import InputLabel from "../Common/InputLabel";
import SelectComp from "../Common/SelectComp";
import { productCategories, unitTypes } from "@/utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";

const BasicInfoFields = () => {
  const dispatch = useDispatch();
  // redux states
  const { name, price, buyingPrice, stock, sku, expiryDate } = useSelector(
    (state) => state.product_slice
  );
  // dispatch function
  const dispatcher = (objKey, value) => {
    dispatch(updateProductSlice({ [objKey]: value }));
  };
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
            value={name}
            action={dispatcher}
            actionFor="name"
            required={true}
          />
        </div>
        <div>
          <SelectComp
            label="Product Category"
            options={productCategories}
            action={dispatcher}
            actionFor={"category"}
            required={true}
          />
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
              value={price}
              action={dispatcher}
              actionFor={"price"}
              required={true}
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
              value={buyingPrice}
              action={dispatcher}
              actionFor={"buyingPrice"}
              required={true}
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
              value={stock}
              action={dispatcher}
              actionFor={"stock"}
              required={true}
            />
          </div>
          <div>
            <InputLabel
              title="Stock keeping unit"
              htmlFor="sku"
              name="sku"
              id="sku"
              placeHolder="ex. 5kg-teer-mustardoil"
              value={sku}
              action={dispatcher}
              actionFor={"sku"}
              required={true}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
          <div>
            <SelectComp
              label="Unit Type"
              options={unitTypes}
              action={dispatcher}
              actionFor={"unitType"}
              required={true}
            />
          </div>
          <div>
            <InputLabel
              title="Expired Date"
              type="date"
              htmlFor="expired_date"
              name="expired_date"
              id="expired_date"
              placeHolder="dd-mm-yyyy"
              value={expiryDate}
              action={dispatcher}
              actionFor={"expiryDate"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
