"use client";

import { useFetchOrdersQuery } from "@/Redux/APIs/OrderApi";
import TableOrder from "../Tables/TableOrder";
import SelectFilter from "../Common/SelectFilter";
import { ordersFilterOptions } from "@/utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderFilter } from "@/Redux/Slices/FilterSlice";
import { useRef, useState } from "react";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { filterOrders } = useSelector((state) => state.filter_slice);
  const { data } = useFetchOrdersQuery({
    filter: filterOrders?.filter,
    search: filterOrders?.search,
  });
  const searchRef = useRef(null);

  const filterOrderFn = (actionFor, value) => {
    let newObj = {};
    for (let property in filterOrders) {
      if (property === "filter") {
        newObj["filter"] = value;
      } else {
        newObj["search"] = filterOrders[property];
      }
    }
    dispatch(updateOrderFilter({ actionFor, value: newObj }));
  };

  const addingSearchText = () => {
    let newObj = {};
    for (let property in filterOrders) {
      if (property === "search") {
        newObj["search"] = searchRef?.current?.value;
      } else {
        newObj["filter"] = filterOrders[property];
      }
    }
    dispatch(updateOrderFilter({ actionFor: "filterOrders", value: newObj }));
  };

  return (
    <div className="min-w-full">
      <div className="w-full flex flex-col md:flex-row items-center justify-between max-md:gap-[.5rem] max-lg:gap-[2rem] py-[1rem]">
        <div className=" max-lg:w-full flex flex-col lg:flex-row max-md:items-start items-center md:items-start max-lg:gap-[.3rem] lg:gap-[2rem]">
          <h3 className="text-[14px] lg:text-[1rem] xl:text-[18px] font-semibold whitespace-nowrap">Order History</h3>
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
              placeholder="Name, Phone, Address"
            />
            <button
              onClick={addingSearchText}
              className="h-full px-[10px] bg-primary text-white rounded-r-[6px]"
            >
              Search
            </button>
          </div>
        </div>
        <div className="self-end w-[90px] md:w-[150px]">
          <SelectFilter
            action={filterOrderFn}
            actionFor={"filterOrders"}
            options={ordersFilterOptions}
          />
        </div>
      </div>
      <div className="w-full mdXYPadding rounded-[10px] bg-background">
        <TableOrder data={data?.data} />
      </div>
    </div>
  );
};

export default OrdersPage;
