"use client";
import React, { useState } from "react";
import InputLabel from "../Common/InputLabel";
import SelectComp from "../Common/SelectComp";
import { productCategories, unitTypes } from "@/utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";
import PickDate from "../Common/PickDate";
import SelectCompObj from "../Common/SelectCompObj";
import { useFetchSuppliersQuery } from "@/Redux/APIs/SuppliersApi";

const BasicInfoFields = () => {
  const [selectedDate, setDate] = useState(null);
  const { data } = useFetchSuppliersQuery();
  const dispatch = useDispatch();
  // redux state
  const { supplier } = useSelector((state) => state.product_slice);
  // dispatcher
  const dispatcher = (objKey, value) => {
    dispatch(updateProductSlice({ [objKey]: value }));
  };
  // query and mutation
  const allSuppliers = data?.data;

  return (
    <div className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont font-[600] text-lightText mb-[1rem]">
        Basic Information
      </h3>
      <div className="flex flex-col gap-[1rem]">
        <div>
          <InputLabel
            title={"Product Name"}
            htmlFor={"product_name"}
            name={"product_name"}
            id="product_name"
            placeHolder="Product Name"
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
        <div className="grid grid-cols-3 gap-[10px]">
          <div>
            <InputLabel
              title="Buying Cost"
              type="number"
              htmlFor="buying_cost"
              name="buying_cost"
              id="buying_cost"
              placeHolder="Buying Cost"
              required={true}
            />
          </div>
          <div>
            <InputLabel
              title="Service Cost"
              type="number"
              htmlFor="service_cost"
              name="service_cost"
              id="service_cost"
              placeHolder="Service Cost"
            />
          </div>
          <div>
            <InputLabel
              title="Selling Price"
              type="number"
              htmlFor="selling_price"
              name="selling_price"
              id="selling_price"
              placeHolder="Selling Price"
              required={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[10px]">
          <div>
            <InputLabel
              title="Stock"
              type="number"
              htmlFor="stock"
              name="stock"
              id="stock"
              placeHolder="Stock"
              required={true}
            />
          </div>
          <div>
            <PickDate
              title="Expired"
              name="expired_date"
              htmlFor="expired_date"
              selectedDate={selectedDate}
              setDate={setDate}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <div>
            <SelectCompObj
              label="Supplier"
              options={allSuppliers}
              action={dispatcher}
              actionFor={"supplier"}
              required={true}
            />
          </div>
          {supplier?.toString()?.toLowerCase() === "others" && (
            <div className="flex flex-col gap-[1rem]">
              <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
                <div>
                  <InputLabel
                    title="Supplier Name"
                    htmlFor="supplier_name"
                    name="supplier_name"
                    id="supplier_name"
                    placeHolder="ex. Ripon Traders"
                    required={true}
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
          )}
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
          <div>
            <InputLabel
              title="Stock keeping unit"
              htmlFor="sku"
              name="sku"
              id="sku"
              placeHolder="ex. 5kg-teer-mustardoil"
              required={true}
            />
          </div>
          <div>
            <SelectComp
              label="Unit Type"
              options={unitTypes}
              action={dispatcher}
              actionFor={"unitType"}
              name={"unitType"}
              required={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
