"use client";
import { useFetchProductsQuery } from "@/Redux/APIs/ProductApi";
import ProductCard from "../Product/ProductCard";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderFilter } from "@/Redux/Slices/FilterSlice";
import ShopIcon from "../Icons/ShopIcon";
import { useRouter } from "next/navigation";

const ShopPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchRef = useRef();
  const { filterProducts } = useSelector((state) => state.filter_slice);
  const { cart } = useSelector((state) => state.cart_slice);
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
      <div className="flex items-center justify-between">
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[2rem] py-[1rem]">
          <h3 className="mdFont font-bold">Shop</h3>
          <div className="w-full flex items-center h-[40px]">
            <input
              ref={searchRef}
              onChange={(e) => {
                if (e.target?.value?.length === 0) {
                  addingSearchText();
                }
              }}
              onKeyUp={addingSearchText}
              className="h-full w-full md:w-[300px] border rounded-l-[6px] focus:outline-none pl-[10px]"
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

        <div
          className="fixed top-[1rem] right-[1rem]"
          style={{ right: "calc((100% - 1280px) / 2 + 1rem)" }}
        >
          <button
            onClick={() => {
              router.push("/place-order");
            }}
            className="bg-background p-[.3rem] rounded-[50%] relative"
          >
            <strong className="text-[12px] font-[500] absolute top-[-2.5px] right-0">
              {cart?.length}
            </strong>
            <ShopIcon />
          </button>
        </div>
      </div>
      <h6 className="text-[12px] font-[500] text-lightText mb-[.5rem]">
        Result: {products?.length}
      </h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] pb-[10rem]">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
