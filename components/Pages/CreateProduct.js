"use client";
import BasicInfoFields from "../Product/BasicInfoFields";
import ProductImages from "../Product/ProductImages";
import Button from "../Common/Button";
import { useCreateProductMutation } from "@/Redux/APIs/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetProductSlice } from "@/Redux/Slices/ProductSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [createProudct] = useCreateProductMutation();
  const { images } = useSelector((state) => state.product_slice);
  const createHandler = async (e) => {
    e.preventDefault();
    const name = e.target.product_name?.value;
    const category = e.target.category?.value;
    const buyingCost = e.target.buying_cost?.value;
    const serviceCost = e.target.service_cost?.value;
    const sellingPrice = e.target.selling_price?.value;
    const stock = e.target.stock?.value;
    const expiredDate = e.target.expired_date?.value;
    const supplier = e.target.supplier?.value;
    const supplierName = e.target.supplier_name?.value;
    const supplierContact = e.target.supplier_contact?.value;
    const supplierAddress = e.target.supplier_address?.value;
    const sku = e.target.sku?.value;
    const unitType = e.target.unitType?.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", "test description");
    formData.append("category", category);
    formData.append("price", sellingPrice);
    formData.append(
      "purchase",
      JSON.stringify({
        buyingCost,
        serviceCost,
        sellingPrice,
        stock,
        expired: expiredDate,
        supplier: supplier,
        profit: 0,
      })
    );
    formData.append("supplier", supplier);
    if (supplier?.toLowerCase() === "others") {
      formData.append(
        "newSupplier",
        JSON.stringify({
          name: supplierName,
          contact: supplierContact,
          address: supplierAddress,
        })
      );
    }
    formData.append("sku", sku);
    formData.append("unitType", unitType);
    Array.from(images).forEach((file) => {
      formData.append("images", file?.file);
    });
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          createProudct(formData)
            .unwrap()
            .then(resolve)
            .catch((error) => {
              // Pass the error object to reject so it's available in the error handler
              reject(error);
            });
        }),
        {
          pending: "Adding Product...",
          success: "Product Added successfully! 🎉",
          error: {
            render({ data }) {
              // data will contain the error object from the rejected promise
              // Extract the error message from the response
              return (
                data?.data?.message || data?.message || "Failed to add product"
              );
            },
          },
        }
      );
      e.target.reset();
      dispatch(resetProductSlice());
    } catch (error) {
      toast.error("Failed to create product", error?.message)
      console.log("Failed to create product: ", error?.message);
    }
  };
  return (
    <div className="max-md:pb-[3rem]">
      <div className="py-[1rem]">
        <h3 className="mdFont font-bold">Create Product</h3>
      </div>
      <form onSubmit={createHandler}>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-[1rem]">
          <div className="md:col-span-5 flex flex-col gap-[1.5rem]">
            <BasicInfoFields />
            {/* <SupplierInfoFileds /> */}
          </div>
          <div className="md:col-span-2">
            <ProductImages />
          </div>
        </div>
        <div className="w-full md:w-[200px]">
          <Button type={"submit"} text="Create Product" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
