"use client";
import SelectCompObj from "../Common/SelectCompObj";
import { suppliers } from "@/utils/Constants";
import InputLabel from "../Common/InputLabel";
import Button from "../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";
import { useCreateProductMutation } from "@/Redux/APIs/ProductApi";
import { useState } from "react";
import { toast } from "react-toastify";

const SupplierInfoFileds = () => {
  const dispatch = useDispatch();
  const [createProudct] = useCreateProductMutation();
  // redux state
  const {
    name,
    category,
    price,
    images,
    buyingPrice,
    stock,
    supplier,
    newSupplier,
    sku,
    unitType,
    expiryDate,
  } = useSelector((state) => state.product_slice);
  // dispatch function
  const dispatcher = (objKey, value) => {
    dispatch(updateProductSlice({ [objKey]: value }));
  };
  // dispatcher for new supplier
  const dispatcherSupplier = (objKey, value) => {
    const obj = { ...newSupplier };
    obj[objKey] = value;
    dispatch(updateProductSlice({ newSupplier: obj }));
  };

  // create product handler function
  const createHandler = async () => {
    const formData = new FormData();
    formData.append("name", "Teer Mustard Oil");
    formData.append("description", "test description");
    formData.append("category", "Dairy");
    formData.append("price", "599");
    formData.append("buyingPrice", "499");
    formData.append("stock", "100");
    formData.append("supplier", "others");
    formData.append(
      "newSupplier",
      JSON.stringify({
        name: "Gazi Enterprise",
        contact: "01393423093",
        address: "123/a Baburhat, Dubai",
      })
    );
    formData.append("sku", "teer-5kg-mustardoil");
    formData.append("unitType", "kg");
    Array.from(images).forEach((file) => {
      formData.append("images", file?.file);
    });
    await toast.promise(
      createProudct(formData).unwrap(), // Unwrap to handle success/reject
      {
        pending: "Creating user...",
        success: "User created successfully! 🎉",
        error: "Failed to create user! ❌",
      }
    );
    // call the product mutation with formData
    // const newProduct = await createProudct(formData);
  };

  return (
    <section className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont mb-[1rem]">Supplier Information</h3>
      <div className="flex flex-col gap-[1rem]">
        <div>
          <SelectCompObj
            label="Supplier"
            options={suppliers}
            action={dispatcher}
            actionFor={"supplier"}
          />
        </div>
        {supplier.toString().toLowerCase() === "others" && (
          <div className="flex flex-col gap-[1rem]">
            <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
              <div>
                <InputLabel
                  title="Supplier Name"
                  htmlFor="supplier_name"
                  name="supplier_name"
                  id="supplier_name"
                  placeHolder="ex. Ripon Traders"
                  value={newSupplier?.name}
                  action={dispatcherSupplier}
                  actionFor={"name"}
                />
              </div>
              <div>
                <InputLabel
                  title="Supplier Contact"
                  htmlFor="supplier_contact"
                  name="supplier_contact"
                  id="supplier_contact"
                  placeHolder="ex. 017########"
                  value={newSupplier?.contact}
                  action={dispatcherSupplier}
                  actionFor={"contact"}
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
                value={newSupplier?.address}
                action={dispatcherSupplier}
                actionFor={"address"}
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <Button action={createHandler} text="Create Product" />
        </div>
      </div>
    </section>
  );
};

export default SupplierInfoFileds;
