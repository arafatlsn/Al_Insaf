"use client";
import { useFetchProductsQuery } from "@/Redux/APIs/ProductApi";
import ProductCard from "../Product/ProductCard";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderFilter } from "@/Redux/Slices/FilterSlice";

const ShopPage = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const { filterProducts } = useSelector((state) => state.filter_slice);
  const data = useFetchProductsQuery({
    filter: filterProducts?.filter,
    search: filterProducts?.search,
  });
  const products = data?.data?.data;

  const addingSearchText = () => {
    let newObj = {};
    for (let property in filterProducts) {
      if (property === "search") {
        newObj["search"] = searchRef?.current?.value;
      } else {
        newObj["filter"] = filterProducts[property];
      }
    }
    dispatch(updateOrderFilter({ actionFor: "filterProducts", value: newObj }));
  };

  return (
    <div>
      <div className="flex items-center gap-[2rem] py-[1rem]">
        <h3 className="mdFont font-bold">Shop</h3>
        <div className="h-[40px]">
          <input
            ref={searchRef}
            onChange={(e) => {
              if (e.target?.value?.length === 0) {
                addingSearchText();
              }
            }}
            onKeyUp={addingSearchText}
            className="h-full w-[300px] border rounded-l-[6px] focus:outline-none pl-[10px]"
            type="text"
            placeholder="Name, Tag, Category"
          />
          <button
            onClick={addingSearchText}
            className="h-full px-[10px] bg-primary text-white rounded-r-[6px]"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[1rem]">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
