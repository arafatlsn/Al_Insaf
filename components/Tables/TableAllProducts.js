import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toDateStringFn } from "@/utils/toDateStringFn";
import Image from "next/image";

const TableAllProducts = ({ data }) => {
  return (
    <>
      <Table className="max-md:hidden max-lg:text-[12px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-left px-0">Purchases History</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead>Invest</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((el) => (
            <TableRow className="odd:bg-background" key={el?._id}>
              <TableCell className="align-top">{el?.name}</TableCell>
              <TableCell className="align-top">{el?.sku}</TableCell>
              <TableCell className="align-top p-0">
                <Table className="p-0 m-0 max-lg:text-[12px]">
                  <TableHeader className="p-0">
                    <TableRow className="h-3 p-0 m-0">
                      <TableHead className="py-0 pt-1 px-0 h-0">Cost</TableHead>
                      <TableHead className="py-0 pt-1 px-0 h-0">
                        Stock
                      </TableHead>
                      <TableHead className="py-0 pt-1 px-0 h-0 max-lg:hidden">
                        Expired
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="p-0">
                    {el?.purchase?.map((el) => (
                      <TableRow className="h-3 p-0 m-0" key={el?._id}>
                        <TableCell className="py-1 px-0">
                          {el?.buyingCost + el?.serviceCost}
                        </TableCell>
                        <TableCell className="py-1 px-0">{el?.stock}</TableCell>
                        <TableCell className="py-1 px-0 max-lg:hidden">
                          {toDateStringFn(el?.expired)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
              <TableCell className="align-top">{el?.totalStock}</TableCell>
              <TableCell className="align-top">{el?.sold}</TableCell>
              <TableCell className="align-top">{el?.invest}</TableCell>
              <TableCell className="align-top">{el?.price}</TableCell>
              <TableCell className="align-top">
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.map((product) => (
        <div
          key={product?._id}
          className="text-[12px] md:hidden flex flex-col gap-[.5rem] py-[1rem] border-b-[1px]"
        >
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Product:</h6>
            <div className="w-full col-span-6 flex justify-end items-start gap-[.3rem] text-[12px]">
              <div>
                <Image
                  src={product?.images[0]}
                  alt="product"
                  width={40}
                  height={40}
                  className="min-w-[40px] max-w-[40px] justify-self-start aspect-square"
                />
              </div>
              <div>
                <h6>{product?.name}</h6>
                <h6 className="text-[10px]">{product?.sku}</h6>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Stock:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{product?.totalStock}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Sold:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{product?.sold}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Invest:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{product?.invest}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Price:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <h6>{product?.price}</h6>
            </div>
          </div>
          <div className="grid grid-cols-8 items-start">
            <h6 className="col-span-2 text-[12px] font-[500]">Purchases:</h6>
            <div className="col-span-6 justify-end justify-self-end flex flex-col items-end text-[12px]">
              <Table className="p-0 m-0 max-lg:text-[12px]">
                <TableHeader className="p-0">
                  <TableRow className="h-3 p-0 m-0">
                    <TableHead className="py-0 pt-1 px-0 pr-[.4rem] h-0">Cost</TableHead>
                    <TableHead className="py-0 pt-1 px-0 pr-[.4rem] h-0">Stock</TableHead>
                    <TableHead className="py-0 pt-1 px-0 pr-[.4rem] h-0">
                      Expired
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="p-0">
                  {product?.purchase?.map((el) => (
                    <TableRow className="h-3 p-0 m-0" key={el?._id}>
                      <TableCell className="py-1 px-0">
                        {el?.buyingCost + el?.serviceCost}
                      </TableCell>
                      <TableCell className="py-1 px-0">{el?.stock}</TableCell>
                      <TableCell className="py-1 px-0">
                        {toDateStringFn(el?.expired)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TableAllProducts;
