"use client";
import React, { useState } from "react";
import InputLabel from "../Common/InputLabel";
import SelectComp from "../Common/SelectComp";
import { productCategories, unitTypes } from "@/utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";
import { randomId } from "@/utils/randomId";
import PickDate from "../Common/PickDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toDateStringFn } from "@/utils/toDateStringFn";
import PlusIcon from "../Icons/PlusIcon";

const BasicInfoFields = () => {
  const [selectedDate, setDate] = useState(null);
  const dispatch = useDispatch();
  // redux states
  const { name, price, purchase, sku } = useSelector(
    (state) => state.product_slice
  );
  // dispatch function
  const dispatcher = (objKey, value) => {
    dispatch(updateProductSlice({ [objKey]: value }));
  };

  const purchaseDispatcher = (e) => {
    e.preventDefault();

    const buyingCost = Number(e.target.buying_cost?.value);
    const serviceCost = Number(e.target.service_cost?.value) || 0;
    const stock = Number(e.target.stock?.value);
    const sellingPrice = Number(e.target.selling_price?.value);
    const [day, month, year] = e.target.expired_date?.value?.split("-");
    const expired = new Date(year, month - 1, day);
    const updatedPurchase = [
      ...purchase,
      {
        id: randomId(),
        buyingCost,
        serviceCost,
        stock,
        sellingPrice,
        expired: expired,
      },
    ];
    dispatch(updateProductSlice({ purchase: updatedPurchase }));
    e.target.reset();
    setDate(null);
  };

  // remove purchase
  const removePurchase = (index) => {
    const newPurchase = purchase?.filter((_, index2) => index !== index2);
    dispatch(updateProductSlice({ purchase: newPurchase }));
  };

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
        <div>
          <InputLabel
            title="Price"
            type="number"
            htmlFor="price"
            name="price"
            id="price"
            placeHolder="Price"
            required={true}
            value={price}
            action={dispatcher}
            actionFor="price"
          />
          </div>
          <div className="bg-gray-100 p-[10px]">
            <h4 className="font-[600] text-[1.3rem]">Purchases</h4>
          {/* SHOW ADDED PURCHASES */}
          {purchase?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buying</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Selling</TableHead>
                  <TableHead>Expired</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchase?.map((el, index) => (
                  <TableRow key={el?.id}>
                    <TableCell>{el?.buyingCost}</TableCell>
                    <TableCell>{el?.serviceCost}</TableCell>
                    <TableCell>{el?.stock}</TableCell>
                    <TableCell>{el?.sellingPrice}</TableCell>
                    <TableCell>{`${toDateStringFn(el?.expired)}`}</TableCell>
                    <TableCell>
                      <button onClick={() => removePurchase(index)}>
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {/* PURCHASE FIELDS  */}
          <form
            onSubmit={purchaseDispatcher}
            className="w-full flex items-center gap-[20px]"
          >
            <div className="grow w-full">
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
              <div className="mt-[10px]">
                <button className="flex items-center justify-center gap-[6px] button bg-primary h-[38px] px-[10px]">
                  <PlusIcon /> <span>Add to purchase</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
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
            />
          </div>
          <div>
            <SelectComp
              label="Unit Type"
              options={unitTypes}
              action={dispatcher}
              actionFor={"unitType"}
              required={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
