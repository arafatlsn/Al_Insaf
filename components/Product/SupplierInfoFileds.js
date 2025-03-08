"use client";
import SelectCompObj from "../Common/SelectCompObj";
import { suppliers } from "@/utils/Constants";
import InputLabel from "../Common/InputLabel";
import Button from "../Common/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";
import { useCreateProductMutation } from "@/Redux/APIs/ProductApi";

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
    // let newImages = [];
    // for (let el of images) {
    //   newImages?.push(el?.file);
    // }
    // const formData = new FormData();
    // Array.from(newImages).forEach((file) => {
    //   formData.append("images", file);
    // });
    const dummyProduct = {
      name: "Teer Mustard Oil",
      description: "test description",
      images: formData,
      category: "Dairy",
      price: 599,
      buyingPrice: 499,
      stock: 100,
      supplier: "others",
      newSupplier: {
        name: "Gazi Enterprise",
        contact: "01393423093",
        address: "123/a Baburhat, Dubai",
      },
      sku: "teer-5kg-mustardoil",
      unitType: "kg",
    };

    const newProduct = await createProudct(dummyProduct);
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
