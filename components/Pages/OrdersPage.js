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
    <div>
      <div className="flex items-center justify-between py-[1rem]">
        <div className="flex items-center gap-[2rem]">
          <h3 className="mdFont font-bold">Order History</h3>
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
        <div className="w-[250px]">
          <SelectFilter
            action={filterOrderFn}
            actionFor={"filterOrders"}
            options={ordersFilterOptions}
          />
        </div>
      </div>
      <div className="mdXYPadding rounded-[10px] bg-background">
        <TableOrder data={data?.data} />
      </div>
    </div>
  );
};

export default OrdersPage;
