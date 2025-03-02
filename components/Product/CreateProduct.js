import React from "react";
import BasicInfoFields from "./BasicInfoFields";
import SupplierInfoFileds from "./SupplierInfoFileds";

const CreateProduct = () => {
  return (
    <section>
      <div className="flex flex-col gap-[1.5rem]">
        <BasicInfoFields />
        <SupplierInfoFileds />
      </div>
    </section>
  );
};

export default CreateProduct;
