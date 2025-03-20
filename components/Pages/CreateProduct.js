import React from "react";
import BasicInfoFields from "../Product/BasicInfoFields";
import SupplierInfoFileds from "../Product/SupplierInfoFileds";
import ProductImages from "../Product/ProductImages";

const CreateProduct = () => {
  return (
    <div>
      <div className="py-[1rem]">
        <h3 className="mdFont font-bold">Create Product</h3>
      </div>
      <div className="grid grid-cols-6 gap-[1rem]">
        <div className="col-span-4 flex flex-col gap-[1.5rem]">
          <BasicInfoFields />
          <SupplierInfoFileds />
        </div>
        <div className="col-span-2">
          <ProductImages />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
