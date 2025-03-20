"use client";
import SelectCompObj from "../Common/SelectCompObj";
import { suppliers } from "@/utils/Constants";
import InputLabel from "../Common/InputLabel";
import Button from "../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProductSlice,
  updateProductSlice,
} from "@/Redux/Slices/ProductSlice";
import { useCreateProductMutation } from "@/Redux/APIs/ProductApi";
import { toast } from "react-toastify";
import { useFetchSuppliersQuery } from "@/Redux/APIs/SuppliersApi";

const SupplierInfoFileds = () => {
  const dispatch = useDispatch();
  const [createProudct] = useCreateProductMutation();
  const { data } = useFetchSuppliersQuery();
  const allSuppliers = data?.data;
  // redux state
  const {
    name,
    category,
    price,
    images,
    purchase,
    supplier,
    newSupplier,
    sku,
    unitType,
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
    // checking all required data
    if (
      !name ||
      !category ||
      !price ||
      !purchase?.length ||
      !supplier ||
      !sku ||
      !unitType ||
      (supplier?.toLowerCase() === "others" && !newSupplier?.name)
    ) {
      toast.error("Please filled all requied fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", "test description");
    formData.append("category", category);
    formData.append("price", price);
    formData.append("purchase", JSON.stringify(purchase));
    formData.append("supplier", supplier);
    formData.append("newSupplier", JSON.stringify(newSupplier));
    formData.append("sku", sku);
    formData.append("unitType", unitType);
    Array.from(images).forEach((file) => {
      formData.append("images", file?.file);
    });
    await toast.promise(
      createProudct(formData).unwrap(), // Unwrap to handle success/reject
      {
        pending: "Adding Product...",
        success: "Product Added successfully! 🎉",
        error: "Failed to Add Product! ❌",
      }
    );
    dispatch(resetProductSlice());
  };

  return (
    <section className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont mb-[1rem]">Supplier Information</h3>
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
