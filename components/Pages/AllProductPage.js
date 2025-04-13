"use client";
import { useFetchProductsQuery } from "@/Redux/APIs/ProductApi";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import TableAllProducts from "../Tables/TableAllProducts";
import { updateOrderFilter } from "@/Redux/Slices/FilterSlice";

const AllProductPage = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const [filterProducts, setFilterProducts] = useState({
    filter: "",
    search: "",
  });
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
    setFilterProducts(newObj);
  };

  return (
    <div>
      <div className=" max-lg:w-full flex flex-col lg:flex-row max-md:items-start items-center md:items-start max-lg:gap-[.3rem] lg:gap-[2rem]">
        <h3 className="text-[14px] lg:text-[1rem] xl:text-[18px] font-semibold whitespace-nowrap">
          All Products
        </h3>
        <div className="flex w-full h-[33px] md:h-[35px] lg:h-[40px] text-[12px] md:text-[14px] lg:text-[15px]">
          <input
            ref={searchRef}
            onChange={(e) => {
              if (e.target?.value?.length === 0) {
                addingSearchText();
              }
            }}
            onKeyUp={addingSearchText}
            className="lg:w-[300px] h-full grow border rounded-l-[6px] focus:outline-none pl-[6px] md:pl-[8px] lg:pl-[10px]"
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
      <div>
        <TableAllProducts data={products} />
        </div>
    </div>
  );
};

export default AllProductPage;
