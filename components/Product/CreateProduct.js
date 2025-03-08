import React from "react";
import BasicInfoFields from "./BasicInfoFields";
import SupplierInfoFileds from "./SupplierInfoFileds";
import ProductImages from "./ProductImages";

const CreateProduct = () => {
  return (
    <section className="grid grid-cols-6 gap-[1rem]">
      <div className="col-span-4 flex flex-col gap-[1.5rem]">
        <BasicInfoFields />
        <SupplierInfoFileds />
      </div>
      <div className="col-span-2">
        <ProductImages />
      </div>
    </section>
  );
};

export default CreateProduct;
