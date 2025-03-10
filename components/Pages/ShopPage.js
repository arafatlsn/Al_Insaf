"use client";
import { useFetchProductsQuery } from "@/Redux/APIs/ProductApi";
import ProductCard from "../Product/ProductCard";

const ShopPage = () => {
  const data = useFetchProductsQuery();
  const products = data?.data?.data;
  return (
    <div className="grid grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product?._id} product={product} />
      ))}
    </div>
  );
};

export default ShopPage;
